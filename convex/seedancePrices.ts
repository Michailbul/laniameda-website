import { v } from "convex/values";
import { internalMutation, query } from "./_generated/server";
import { priceGroup } from "./schema";

/** The newest snapshot, plus a short history of earlier checks for the change log. */
export const latest = query({
  args: {},
  handler: async (ctx) => {
    const recent = await ctx.db
      .query("seedanceSnapshots")
      .withIndex("by_publishedAt")
      .order("desc")
      .take(12);
    const [current, ...earlier] = recent;
    if (!current) return null;
    return {
      ...current,
      history: earlier.map((s) => ({
        publishedAt: s.publishedAt,
        verifiedOn: s.verifiedOn,
        changes: s.changes,
      })),
    };
  },
});

/**
 * Publish a price check. Internal: only the CLI (`npx convex run`) or another Convex function
 * can call it, so the page's public client cannot write prices.
 *
 * The diff is computed here rather than by the publisher, so the change log cannot disagree
 * with what is actually stored.
 */
export const publish = internalMutation({
  args: {
    verifiedOn: v.string(),
    groups: v.array(priceGroup),
    notes: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const previous = await ctx.db
      .query("seedanceSnapshots")
      .withIndex("by_publishedAt")
      .order("desc")
      .first();

    const key = (g: { model: string; tier: string }, r: { provider: string; route: string }) =>
      `${g.model}|${g.tier}|${r.provider}|${r.route}`;
    const index = (groups: typeof args.groups) => {
      const m = new Map<string, { model: string; tier: string; provider: string; route: string; usd: number }>();
      for (const g of groups)
        for (const r of g.rows)
          if (r.route !== "studio")
            m.set(key(g, r), { model: g.model, tier: g.tier, provider: r.provider, route: r.route, usd: r.usd });
      return m;
    };

    const changes = [];
    if (previous) {
      const before = index(previous.groups);
      const after = index(args.groups);
      for (const [k, a] of after) {
        const b = before.get(k);
        // Under a hundredth of a cent a second is rounding, not a price move.
        if (!b || Math.abs(b.usd - a.usd) > 0.00005) {
          changes.push({ model: a.model, tier: a.tier, provider: a.provider, route: a.route, ...(b ? { from: b.usd } : {}), to: a.usd });
        }
      }
      for (const [k, b] of before) {
        if (!after.has(k)) changes.push({ model: b.model, tier: b.tier, provider: b.provider, route: b.route, from: b.usd });
      }
    }

    const id = await ctx.db.insert("seedanceSnapshots", {
      publishedAt: Date.now(),
      verifiedOn: args.verifiedOn,
      groups: args.groups,
      notes: args.notes,
      changes,
    });
    return { id, changes: changes.length, rows: args.groups.reduce((n, g) => n + g.rows.length, 0) };
  },
});

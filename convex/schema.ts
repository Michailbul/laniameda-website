import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

/**
 * One row of the Seedance price list: what one provider charges for one second of output at
 * one tier, and how you reach it.
 *
 * `route` is the split the page is built around. `api` is a metered API you can send a job
 * to; `platform` is a web app paid in credits; `studio` is Fantasy Studio's own row, which is
 * not a price but whichever API route was cheapest.
 */
export const priceRow = v.object({
  provider: v.string(),
  /** USD per second of output. Never per clip. */
  usd: v.number(),
  route: v.union(v.literal("api"), v.literal("platform"), v.literal("studio")),
  /** The working: token rate x tokens per second, or credits per second x credit price. */
  detail: v.string(),
  /** Platform rows: what the credit costs and on which terms. */
  plan: v.optional(v.string()),
  /** The model owner's own rate. */
  anchor: v.optional(v.boolean()),
  /** ISO date a promotional rate ends. */
  promo: v.optional(v.string()),
  /** Seen second-hand, or a sale price with no list behind it. */
  provisional: v.optional(v.boolean()),
});

export const priceGroup = v.object({
  model: v.string(),
  tier: v.string(),
  rows: v.array(priceRow),
});

export const priceChange = v.object({
  model: v.string(),
  tier: v.string(),
  provider: v.string(),
  route: v.string(),
  /** Absent when the row is new. */
  from: v.optional(v.number()),
  /** Absent when the row disappeared. */
  to: v.optional(v.number()),
});

export default defineSchema({
  /**
   * Every published price check, newest last. A check that found nothing new is still a
   * snapshot: "re-read on this date, nothing moved" is information the page shows.
   */
  seedanceSnapshots: defineTable({
    publishedAt: v.number(),
    /** The date the rates were read off the providers' own pages. */
    verifiedOn: v.string(),
    groups: v.array(priceGroup),
    /** The qualifying notes under the table, as HTML-free sentences. */
    notes: v.array(v.string()),
    /** What moved against the previous snapshot. */
    changes: v.array(priceChange),
  }).index("by_publishedAt", ["publishedAt"]),
});

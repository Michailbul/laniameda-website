"use client";

import { ConvexProvider, ConvexReactClient, useQuery } from "convex/react";
import { Inter, JetBrains_Mono, Darker_Grotesque } from "next/font/google";
import { Fragment, useEffect, useMemo, useState } from "react";
import { api } from "../../../convex/_generated/api";
import s from "./tracker.module.css";

const inter = Inter({ subsets: ["latin"], variable: "--tr-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--tr-mono" });
const display = Darker_Grotesque({ subsets: ["latin"], weight: ["600", "700"], variable: "--tr-display" });

// Missing env must not take the whole site's build down with it; the page says so instead.
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = CONVEX_URL ? new ConvexReactClient(CONVEX_URL) : null;
const fonts = `${inter.variable} ${mono.variable} ${display.variable}`;

export function Tracker() {
  if (!convex) {
    return (
      <div className={`${s.page} ${fonts}`}>
        <main className={s.main}><p className={s.quiet}>Prices are unavailable: NEXT_PUBLIC_CONVEX_URL is not set.</p></main>
      </div>
    );
  }
  return (
    <ConvexProvider client={convex}>
      <div className={`${s.page} ${fonts}`}>
        <Board />
      </div>
    </ConvexProvider>
  );
}

type Filter = "all" | "api" | "platform";
type View = "table" | "list";
type Snapshot = NonNullable<ReturnType<typeof useLatest>>;
type Group = Snapshot["groups"][number];
type Row = Group["rows"][number];

const useLatest = () => useQuery(api.seedancePrices.latest);
const VIEW_KEY = "seedance-tracker:view";

const money = (v: number) => (v >= 1 ? "$" + v.toFixed(2) : v >= 0.01 ? "$" + v.toFixed(4) : "$" + v.toFixed(5));
const when = (ms: number) =>
  new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

/** The cheapest API row per tier: the floor Fantasy Studio routes to. */
const cheapestApi = (g: Group): Row | null => {
  const api = g.rows.filter((r) => r.route === "api");
  return api.length ? api.reduce((a, b) => (b.usd < a.usd ? b : a)) : null;
};

function Board() {
  const data = useLatest();
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("table");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(VIEW_KEY);
      if (saved === "table" || saved === "list") setView(saved);
    } catch {}
  }, []);
  const pickView = (v: View) => {
    setView(v);
    try { localStorage.setItem(VIEW_KEY, v); } catch {}
  };

  const counts = useMemo(() => {
    if (!data) return null;
    const providers = new Set(data.groups.flatMap((g) => g.rows.filter((r) => r.route !== "studio").map((r) => r.provider)));
    return { tiers: data.groups.length, providers: providers.size };
  }, [data]);

  if (data === undefined) return <main className={s.main}><p className={s.quiet}>Loading prices…</p></main>;
  if (data === null) return <main className={s.main}><p className={s.quiet}>No prices published yet.</p></main>;

  return (
    <main className={s.main}>
      <header className={s.head}>
        <h1 className={s.h1}>What a second of Seedance costs</h1>
        <p className={s.stand}>
          Every API and platform that sells Seedance, at every resolution, in US dollars per second of output.
          Re-checked against each provider&apos;s own page every three days.
        </p>
        <div className={s.meta}>
          <span>Verified {data.verifiedOn}</span>
          <span>Published {when(data.publishedAt)}</span>
          {counts && <span>{counts.tiers} tiers · {counts.providers} providers</span>}
          <span>16:9 · per second</span>
          <span className={s.live}><i /> live</span>
        </div>
      </header>

      <div className={s.controls}>
        <Seg label="View" value={view} onChange={pickView} options={[["table", "Table"], ["list", "List"]]} />
        <Seg label="Show" value={filter} onChange={setFilter} options={[["all", "All"], ["api", "Through the API"], ["platform", "On the platform"]]} />
        <div className={s.key}>
          <span><i className={s.dotWin} /> cheapest API route</span>
          <span><i className={s.dotPlan} /> web app, paid in credits</span>
          <span><i className={s.dotHollow} /> unconfirmed</span>
        </div>
      </div>

      {view === "table" ? <Grid groups={data.groups} filter={filter} /> : <List groups={data.groups} filter={filter} />}

      <section className={s.section}>
        <h2 className={s.h2}>What moved at the last check</h2>
        {data.changes.length === 0 ? (
          <p className={s.quiet}>Nothing moved against the previous check.</p>
        ) : (
          <ul className={s.changes}>
            {data.changes.map((c) => (
              <li key={`${c.model}${c.tier}${c.provider}${c.route}`}>
                <b>{c.model} {c.tier}</b> on {c.provider}
                <span className={s.quiet}> ({c.route === "platform" ? "platform" : "API"})</span>:{" "}
                {c.from === undefined ? <>new at {money(c.to!)}</> : c.to === undefined ? <>dropped, was {money(c.from)}</> : <>{money(c.from)} → {money(c.to)}</>}
              </li>
            ))}
          </ul>
        )}
        {data.history.length > 0 && (
          <p className={s.quiet}>
            Earlier checks:{" "}
            {data.history.map((h, i) => (
              <span key={h.publishedAt}>
                {i > 0 && " · "}
                {when(h.publishedAt)} ({h.changes.length} moved)
              </span>
            ))}
          </p>
        )}
      </section>

      <section className={s.section}>
        <h2 className={s.h2}>Notes</h2>
        {data.notes.map((n) => <p key={n} className={s.note}>{n}</p>)}
      </section>
    </main>
  );
}

function Seg<T extends string>({ label, value, onChange, options }: {
  label: string; value: T; onChange: (v: T) => void; options: [T, string][];
}) {
  return (
    <div className={s.seg} role="group" aria-label={label}>
      {options.map(([v, text]) => (
        <button key={v} type="button" className={value === v ? s.on : ""} onClick={() => onChange(v)} aria-pressed={value === v}>
          {text}
        </button>
      ))}
    </div>
  );
}

/**
 * The table view: providers down the side, every model and tier across the top, one price per
 * cell. Providers are ordered by how close they sit to the cheapest API route on average, so
 * the top of each block is the best all-rounder.
 */
function Grid({ groups, filter }: { groups: Group[]; filter: Filter }) {
  const floors = groups.map(cheapestApi);

  const providers = (route: "api" | "platform") => {
    const names = [...new Set(groups.flatMap((g) => g.rows.filter((r) => r.route === route).map((r) => r.provider)))];
    const score = (name: string) => {
      const ratios = groups.flatMap((g, i) => {
        const r = g.rows.find((x) => x.provider === name && x.route === route);
        return r && floors[i] ? [r.usd / floors[i]!.usd] : [];
      });
      return ratios.reduce((a, b) => a + b, 0) / (ratios.length || 1);
    };
    return names.map((n) => ({ n, sc: score(n) })).sort((a, b) => a.sc - b.sc).map((x) => x.n);
  };

  // Model headers span their consecutive tiers.
  const spans: { model: string; n: number }[] = [];
  for (const g of groups) {
    const last = spans[spans.length - 1];
    if (last && last.model === g.model) last.n++;
    else spans.push({ model: g.model, n: 1 });
  }

  const cell = (g: Group, i: number, name: string, route: "api" | "platform") => {
    const r = g.rows.find((x) => x.provider === name && x.route === route);
    if (!r) return <td key={i} className={s.na}>—</td>;
    const win = route === "api" && floors[i] === r;
    const title = [r.plan, r.detail, r.promo ? `promo to ${r.promo}` : "", r.provisional ? "unconfirmed" : ""].filter(Boolean).join(" · ");
    return (
      <td key={i} className={[win ? s.win : "", r.provisional ? s.unsure : ""].join(" ")} title={title}>
        {money(r.usd)}
        {r.promo && <small className={s.cellTag}>promo</small>}
      </td>
    );
  };

  const block = (route: "api" | "platform", label: string) => (
    <>
      <tr className={`${s.gridSection} ${route === "platform" ? s.routePlan : ""}`}>
        <th colSpan={groups.length + 1}>{label}</th>
      </tr>
      {route === "api" && (
        <tr className={s.studio}>
          <th>Fantasy Studio</th>
          {groups.map((g, i) => (
            <td key={i} title={floors[i] ? `routes to ${floors[i]!.provider}` : ""}>
              {floors[i] ? money(floors[i]!.usd) : "—"}
              {floors[i] && <small className={s.cellTag}>{floors[i]!.provider}</small>}
            </td>
          ))}
        </tr>
      )}
      {providers(route).map((name) => (
        <tr key={name} className={route === "platform" ? s.plan : ""}>
          <th className={s.prov}>{name}</th>
          {groups.map((g, i) => cell(g, i, name, route))}
        </tr>
      ))}
    </>
  );

  return (
    <div className={s.scroll}>
      <table className={s.grid}>
        <thead>
          <tr>
            <th rowSpan={2} className={s.corner}>USD / second</th>
            {spans.map((sp) => <th key={sp.model} colSpan={sp.n} className={s.modelHead}>{sp.model.replace("Seedance ", "")}</th>)}
          </tr>
          <tr>
            {groups.map((g) => <th key={g.model + g.tier} className={s.tierHead}>{g.tier}</th>)}
          </tr>
        </thead>
        <tbody>
          {filter !== "platform" && block("api", "Through the API")}
          {filter !== "api" && block("platform", "On the platform · paying in credits")}
        </tbody>
      </table>
    </div>
  );
}

/** The list view: one tier at a time, every route with its working underneath. */
function List({ groups, filter }: { groups: Group[]; filter: Filter }) {
  return (
    <div className={s.scroll}>
      <table className={s.table}>
        <thead>
          <tr>
            <th className={s.wide}>Model</th>
            <th className={s.wide}>Tier</th>
            <th>Provider</th>
            <th className={s.num}>USD / second</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((g) => {
            const cheapest = cheapestApi(g);
            const blocks = [
              { route: "api" as const, label: "Through the API", rows: g.rows.filter((r) => r.route !== "platform") },
              { route: "platform" as const, label: "On the platform · paying in credits", rows: g.rows.filter((r) => r.route === "platform") },
            ].filter((b) => b.rows.length > 0 && (filter === "all" || filter === b.route));
            return blocks.map((b, bi) => (
              <Fragment key={`${g.model}-${g.tier}-${b.route}`}>
                <tr className={`${s.route} ${b.route === "platform" ? s.routePlan : ""} ${bi === 0 ? s.groupStart : ""}`}>
                  <td className={`${s.model} ${s.wide}`}>{bi === 0 ? g.model : ""}</td>
                  <td className={`${s.tier} ${s.wide}`}>{bi === 0 ? g.tier : ""}</td>
                  <td colSpan={2}>
                    {bi === 0 && <span className={s.narrowTier}>{g.model} · {g.tier}</span>}
                    {b.label}
                  </td>
                </tr>
                {b.rows.map((r) => {
                  const win = r === cheapest;
                  const cls = [
                    r.route === "studio" ? s.studio : "",
                    r.route === "platform" ? s.plan : "",
                    win ? s.win : "",
                    r.provisional ? s.unsure : "",
                  ].join(" ");
                  return (
                    <tr key={r.provider + r.route} className={cls}>
                      <td className={s.wide} />
                      <td className={s.wide} />
                      <td className={s.prov}>
                        {r.provider}
                        {win && <span className={s.tag}>cheapest</span>}
                        {!win && r.anchor && <span className={`${s.tag} ${s.tagQuiet}`}>first-party</span>}
                        {r.promo && <span className={`${s.tag} ${s.tagQuiet}`}>promo to {r.promo}</span>}
                        {r.provisional && <span className={`${s.tag} ${s.tagQuiet}`}>unconfirmed</span>}
                        <small className={s.detail}>{r.plan ? `${r.plan} · ${r.detail}` : r.detail}</small>
                      </td>
                      <td className={s.num}>{money(r.usd)}</td>
                    </tr>
                  );
                })}
              </Fragment>
            ));
          })}
        </tbody>
      </table>
    </div>
  );
}

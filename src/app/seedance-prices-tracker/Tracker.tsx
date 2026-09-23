"use client";

import { ConvexProvider, ConvexReactClient, useQuery } from "convex/react";
import { Inter, JetBrains_Mono, Darker_Grotesque } from "next/font/google";
import { useEffect, useMemo, useState } from "react";
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
type View = "table" | "charts";
type Snapshot = NonNullable<ReturnType<typeof useLatest>>;
type Group = Snapshot["groups"][number];
type Row = Group["rows"][number];

const useLatest = () => useQuery(api.seedancePrices.latest);
const VIEW_KEY = "seedance-tracker:view";
const STUDIO_URL = "https://fantasy-studio.laniameda.space";

const money = (v: number) => (v >= 1 ? "$" + v.toFixed(2) : v >= 0.01 ? "$" + v.toFixed(4) : "$" + v.toFixed(5));
const when = (ms: number) =>
  new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

const cheapestOf = (rows: Row[]): Row | null =>
  rows.length ? rows.reduce((a, b) => (b.usd < a.usd ? b : a)) : null;

/** The cheapest API row per tier: the floor Fantasy Studio routes to. */
const cheapestApi = (g: Group) => cheapestOf(g.rows.filter((r) => r.route === "api"));

/** The cheapest platform row per tier. Unconfirmed figures do not compete for it. */
const cheapestPlatform = (g: Group) => cheapestOf(g.rows.filter((r) => r.route === "platform" && !r.provisional));

function Board() {
  const data = useLatest();
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<View>("table");
  useEffect(() => {
    try {
      const saved = localStorage.getItem(VIEW_KEY);
      if (saved === "table" || saved === "charts") setView(saved);
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
        <p className={s.studioLine}>
          <a href={STUDIO_URL} target="_blank" rel="noopener">Fantasy Studio</a> sends every request to the
          cheapest API route in this table, per model and per tier.{" "}
          <a href={STUDIO_URL} target="_blank" rel="noopener" className={s.studioCta}>Open the app →</a>
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
        <Seg label="View" value={view} onChange={pickView} options={[["table", "Table"], ["charts", "Charts"]]} />
        <Seg label="Show" value={filter} onChange={setFilter} options={[["all", "All"], ["api", "Through the API"], ["platform", "On the platform"]]} />
        <div className={s.key}>
          <span><i className={s.dotWin} /> cheapest API route</span>
          <span><i className={s.dotPlanWin} /> cheapest platform</span>
          <span><i className={s.dotPlan} /> web app, paid in credits</span>
          <span><i className={s.dotHollow} /> unconfirmed</span>
        </div>
      </div>

      {view === "table" ? <Grid groups={data.groups} filter={filter} /> : <Charts groups={data.groups} filter={filter} />}

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
  const platformFloors = groups.map(cheapestPlatform);

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
    const win = route === "api" ? floors[i] === r : platformFloors[i] === r;
    const title = [r.plan, r.detail, r.promo ? `promo to ${r.promo}` : "", r.provisional ? "unconfirmed" : ""].filter(Boolean).join(" · ");
    const winCls = win ? (route === "api" ? s.win : s.winPlan) : "";
    return (
      <td key={i} className={[winCls, r.provisional ? s.unsure : ""].join(" ")} title={title}>
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
          <th><a href={STUDIO_URL} target="_blank" rel="noopener" className={s.studioName}>Fantasy Studio ↗</a></th>
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

/**
 * The charts view: one bar chart per model and tier, cheapest first. API bars are ink, platform
 * bars amber; the cheapest of each is saturated. The dashed line is ByteDance's own rate, so a
 * bar that reaches past it is paying markup.
 */
function Charts({ groups, filter }: { groups: Group[]; filter: Filter }) {
  return (
    <div className={s.charts}>
      {groups.map((g) => {
        const rows = g.rows
          .filter((r) => r.route !== "studio" && (filter === "all" || r.route === filter))
          .sort((a, b) => a.usd - b.usd);
        if (!rows.length) return null;
        const max = Math.max(...rows.map((r) => r.usd));
        const anchor = g.rows.find((r) => r.anchor);
        const apiWin = cheapestApi(g);
        const platWin = cheapestPlatform(g);
        return (
          <section key={g.model + g.tier} className={s.chart}>
            <header className={s.chartHead}>
              <h3 className={s.chartTitle}>{g.model} <em>{g.tier}</em></h3>
              {anchor && <span className={s.chartSrc}>ByteDance {money(anchor.usd)}</span>}
            </header>
            <div className={s.bars}>
              {rows.map((r) => {
                const win = r === apiWin || r === platWin;
                const cls = [
                  s.barRow,
                  r.route === "platform" ? s.barPlan : s.barApi,
                  win ? s.barWin : "",
                  r.provisional ? s.barUnsure : "",
                ].join(" ");
                return (
                  <div key={r.provider + r.route} className={cls} title={[r.plan, r.detail].filter(Boolean).join(" · ")}>
                    <span className={s.barName}>{r.provider}</span>
                    <span className={s.barTrack}>
                      <i style={{ width: `${Math.max(1.5, (r.usd / max) * 100)}%` }} />
                      {anchor && <b style={{ left: `${(anchor.usd / max) * 100}%` }} />}
                    </span>
                    <span className={s.barVal}>{money(r.usd)}</span>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

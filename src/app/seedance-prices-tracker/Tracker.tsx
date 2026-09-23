"use client";

import { ConvexProvider, ConvexReactClient, useQuery } from "convex/react";
import { Inter, JetBrains_Mono, Darker_Grotesque } from "next/font/google";
import { useMemo, useState } from "react";
import { api } from "../../../convex/_generated/api";
import s from "./tracker.module.css";

const inter = Inter({ subsets: ["latin"], variable: "--tr-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--tr-mono" });
const display = Darker_Grotesque({ subsets: ["latin"], weight: ["600", "700"], variable: "--tr-display" });

// Missing env must not take the whole site's build down with it; the page says so instead.
const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;
const convex = CONVEX_URL ? new ConvexReactClient(CONVEX_URL) : null;

export function Tracker() {
  if (!convex) {
    return (
      <div className={`${s.page} ${inter.variable} ${mono.variable} ${display.variable}`}>
        <main className={s.main}><p className={s.quiet}>Prices are unavailable: NEXT_PUBLIC_CONVEX_URL is not set.</p></main>
      </div>
    );
  }
  return (
    <ConvexProvider client={convex}>
      <div className={`${s.page} ${inter.variable} ${mono.variable} ${display.variable}`}>
        <Board />
      </div>
    </ConvexProvider>
  );
}

type Route = "api" | "platform" | "studio";
type Filter = "all" | "api" | "platform";

const money = (v: number) => (v >= 1 ? "$" + v.toFixed(2) : v >= 0.01 ? "$" + v.toFixed(4) : "$" + v.toFixed(5));
const when = (ms: number) =>
  new Date(ms).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

function Board() {
  const data = useQuery(api.seedancePrices.latest);
  const [filter, setFilter] = useState<Filter>("all");

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
        <div className={s.seg} role="group" aria-label="Show">
          {(["all", "api", "platform"] as const).map((f) => (
            <button key={f} type="button" className={filter === f ? s.on : ""} onClick={() => setFilter(f)} aria-pressed={filter === f}>
              {f === "all" ? "All" : f === "api" ? "Through the API" : "On the platform"}
            </button>
          ))}
        </div>
        <div className={s.key}>
          <span><i className={s.dotStudio} /> Fantasy Studio, routing to the cheapest API</span>
          <span><i className={s.dotPlan} /> web app, paid in credits</span>
          <span><i className={s.dotHollow} /> unconfirmed</span>
        </div>
      </div>

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
            {data.groups.map((g) => {
              const api = g.rows.filter((r) => r.route === "api");
              const cheapest = api.length ? api.reduce((a, b) => (b.usd < a.usd ? b : a)) : null;
              const blocks: { route: Exclude<Route, "studio">; label: string; rows: typeof g.rows }[] = [
                { route: "api" as const, label: "Through the API", rows: g.rows.filter((r) => r.route !== "platform") },
                { route: "platform" as const, label: "On the platform · paying in credits", rows: g.rows.filter((r) => r.route === "platform") },
              ].filter((b) => b.rows.length > 0 && (filter === "all" || filter === b.route));
              return blocks.map((b, bi) => (
                <FragmentRows key={`${g.model}-${g.tier}-${b.route}`}>
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
                </FragmentRows>
              ));
            })}
          </tbody>
        </table>
      </div>

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

function FragmentRows({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

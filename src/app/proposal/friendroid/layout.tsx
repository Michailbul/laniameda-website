import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Friendroid Proposal | Laniameda",
  description:
       "Creative Treatment Package — first step to build a connected trusted audience in robotics niche. $2,000 / 10  days.",

};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        rel="preload"
        href="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
        as="fetch"
        crossOrigin="anonymous"
      />
      <div className="select-none">{children}</div>
    </>
  );
}

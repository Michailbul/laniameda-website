import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Friendroid Proposal | Laniameda",
  description:
    "Creative Treatment Package — Pre-launch audience system for Robots Retail. $1,000 / 5 working days.",
};

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

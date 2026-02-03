import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Friendroid Proposal | Laniameda",
  description:
    "Creative Treatment Package — Build a connected, trusted audience in the robotics niche. $2,000 / 5 business days.",
};

export default function ProposalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

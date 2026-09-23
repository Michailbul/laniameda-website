import type { Metadata } from "next";
import { Tracker } from "./Tracker";

export const metadata: Metadata = {
  title: "Seedance Prices Tracker | Laniameda",
  description:
    "What a second of Seedance costs on every API and platform, per resolution, re-checked every three days.",
};

export default function Page() {
  return <Tracker />;
}

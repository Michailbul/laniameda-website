"use client";

import { V3CreativeTreatment } from "../components/cards/v3-creative-treatment";
import { ThemeProvider } from "../components/ThemeContext";

const themeScript = `
  (function() {
    const theme = localStorage.getItem("friendroid-theme");
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "dark" || (!theme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark");
    }
  })();
`;

export default function Version3Page() {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <ThemeProvider>
        <div className="min-h-screen bg-zinc-950 text-white">
          <div className="max-w-[850px] mx-auto px-6 sm:px-8 py-16 sm:py-24">
            <V3CreativeTreatment />
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

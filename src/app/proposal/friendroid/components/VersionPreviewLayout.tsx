"use client";

import { ThemeProvider } from "./ThemeContext";

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

export function VersionPreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      <ThemeProvider>
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
          <div className="max-w-[850px] mx-auto px-6 sm:px-8 py-12 sm:py-20">
            {children}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}

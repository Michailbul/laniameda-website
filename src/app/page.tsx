export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <section className="min-h-screen px-5 py-5 sm:px-8 sm:py-7">
        <a
          href="/andromeda"
          className="group absolute right-5 top-5 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55 transition-colors duration-300 hover:text-white sm:right-8 sm:top-7"
        >
          <span className="relative">
            Andromeda
            <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
          </span>
          <span className="translate-y-px text-white/30 transition-all duration-300 group-hover:-translate-y-0 group-hover:translate-x-0.5 group-hover:text-white">
            <svg
              aria-hidden="true"
              viewBox="0 0 12 12"
              className="h-3 w-3"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M3.5 8.5 8.5 3.5M4.25 3.5H8.5v4.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </a>

        <div className="absolute left-5 top-5 max-w-[18rem] sm:left-8 sm:top-7">
          <h1 className="text-[15px] font-medium leading-none tracking-[-0.01em] text-white sm:text-base">
            Misha Buloichyk
          </h1>
          <p className="mt-2 text-[13px] font-light leading-none text-white/55 sm:text-sm">
            AI creative engineer.
          </p>
          <a
            href="/Misha-Buloichyk-Resume.pdf"
            download
            className="mt-6 inline-flex font-mono text-[10px] uppercase tracking-[0.2em] text-white/38 transition-colors duration-300 hover:text-white"
          >
            Download resume
          </a>
        </div>
      </section>
    </main>
  )
}

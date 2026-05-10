/**
 * Ferrari tutorial — page background.
 *
 * Sits behind the content from the bottom of the hero zone downward.
 * Starts as solid `#0A0A0A` at the top (where the hero video's fade
 * lands) and reveals its texture as you scroll. The hero's bottom-fade
 * gradient terminates in `#0A0A0A` and this component fades IN from the
 * same color via its own top mask, so the seam between hero and section
 * is invisible.
 */

export function GridDotsBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 z-0"
      style={{
        top: "min(880px, 95vh)",
        bottom: 0,
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-full"
        style={{
          background: "#0A0A0A",
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px),
            radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px, 40px 40px, 40px 40px",
          backgroundPosition: "0 0, 0 0, 20px 20px",
        }}
      />

      {/* Coral halo — keeps the brand accent alive at the top of the
          section without competing with reading copy. */}
      <div
        className="absolute inset-x-0 top-0 h-[60vh] mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(229,134,111,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Top mask — fades the grid INTO #0A0A0A so the hero meets the bg
          at solid black, then the texture reveals downward. */}
      <div
        className="absolute inset-x-0 top-0 h-64"
        style={{
          background:
            "linear-gradient(to bottom, #0A0A0A 0%, rgba(10,10,10,0.85) 35%, rgba(10,10,10,0.45) 70%, transparent 100%)",
        }}
      />

      {/* Outro bloom — closes the page with a brand-colored radial bloom.
          The 40% inner stop is solid #0A0A0A so the SkillFooter copy sits
          on a calm dark plate; coral blooms only at the bottom corners.
          Center-y at 10% pushes the dark region up so most of the section
          reads as the gradient transition rather than flat dark. */}
      <div
        className="absolute inset-x-0 bottom-0 h-[800px]"
        style={{
          background:
            "radial-gradient(125% 125% at 50% 10%, #0A0A0A 40%, #E5866F 100%)",
        }}
      />

      {/* Bridge — fades the grid pattern above into the bloom's dark
          center so there's no seam between grid and outro. */}
      <div
        className="absolute inset-x-0 h-32"
        style={{
          bottom: "800px",
          background:
            "linear-gradient(to top, #0A0A0A 0%, rgba(10,10,10,0) 100%)",
        }}
      />
    </div>
  )
}

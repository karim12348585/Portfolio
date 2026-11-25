export function AnimeCornerHud() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none"
    >
      {/* ====================================================================
          TOP-LEFT CORNER HUD: Bracket + Neural Sync Status Bar
          ==================================================================== */}
      <div className="anime-hud-corner absolute top-[4.5rem] left-2.5 hidden flex-col gap-1 lg:flex">
        <div className="relative pt-2 pl-2.5">
          {/* L-Shaped Corner Bracket */}
          <span className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-accent/65" />
          <span className="absolute top-0 left-0 h-1.5 w-1.5 bg-accent" />

          <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-accent/85 uppercase">
            <span className="beacon-dot h-1.5 w-1.5 rounded-full bg-accent" />
            <span>SYS.LINK</span>
          </div>

          {/* Segmented Anime Data Status Bar */}
          <div className="mt-1 flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((seg) => (
              <span
                key={seg}
                className="h-1 w-2 rounded-[1px] bg-accent/60 first:bg-accent last:bg-accent-soft/70"
              />
            ))}
          </div>
        </div>

        {/* Vertical Rail Tick Marks */}
        <div className="ml-0.5 flex flex-col gap-1 border-l border-accent/25 py-1 pl-2 font-mono text-[8px] tracking-widest text-faint/75">
          <span>神経接続</span>
          <span>99.8%</span>
        </div>
      </div>

      {/* ====================================================================
          TOP-RIGHT CORNER HUD: Bracket + Telemetry Equalizer
          ==================================================================== */}
      <div className="anime-hud-corner absolute top-[4.5rem] right-2.5 hidden flex-col items-end gap-1 lg:flex">
        <div className="relative pt-2 pr-2.5 text-right">
          {/* L-Shaped Corner Bracket */}
          <span className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-accent/65" />
          <span className="absolute top-0 right-0 h-1.5 w-1.5 bg-accent-soft" />

          <div className="flex items-center justify-end gap-1 font-mono text-[9px] tracking-widest text-accent/85 uppercase">
            <span>AURA.LVL</span>
            <span className="text-accent-soft">✦</span>
          </div>

          {/* Mini Anime Telemetry Equalizer Bars */}
          <div className="mt-1 flex h-2.5 items-end justify-end gap-0.5">
            <span className="hud-bar-1 w-1 bg-accent/70" />
            <span className="hud-bar-2 w-1 bg-accent/85" />
            <span className="hud-bar-3 w-1 bg-accent-soft/80" />
            <span className="hud-bar-2 w-1 bg-accent/60" />
            <span className="hud-bar-1 w-1 bg-amber-400/80" />
          </div>
        </div>

        {/* Right Vertical Rail Tick Marks */}
        <div className="mr-0.5 flex flex-col items-end gap-1 border-r border-accent/25 py-1 pr-2 font-mono text-[8px] tracking-widest text-faint/75">
          <span>S-RANK</span>
          <span>特級</span>
        </div>
      </div>

      {/* ====================================================================
          BOTTOM-LEFT CORNER HUD: Bracket + Reticle + Data Stream Bar
          ==================================================================== */}
      <div className="anime-hud-corner absolute bottom-3 left-2.5 hidden flex-col justify-end gap-1 lg:flex">
        <div className="ml-0.5 flex flex-col gap-1 border-l border-accent-soft/30 py-1 pl-2 font-mono text-[8px] tracking-widest text-faint/75">
          <span>0.4ms</span>
          <span>稼働中</span>
        </div>

        <div className="relative pb-2 pl-2.5">
          {/* Bottom-Left L-Bracket */}
          <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-accent-soft/65" />
          <span className="absolute bottom-0 left-0 h-1.5 w-1.5 bg-accent-soft" />

          <div className="flex items-center gap-1.5 font-mono text-[9px] tracking-widest text-muted/85 uppercase">
            <svg
              viewBox="0 0 16 16"
              className="h-2.5 w-2.5 text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="8" cy="8" r="5" />
              <path d="M8 1v3M8 12v3M1 8h3M12 8h3" />
            </svg>
            <span>STREAM</span>
          </div>

          {/* Thin Progress Status Strip */}
          <div className="mt-1 h-1 w-14 overflow-hidden rounded-full bg-panel-2">
            <div className="h-full w-4/5 bg-gradient-to-r from-accent via-accent-soft to-amber-400" />
          </div>
        </div>
      </div>

      {/* ====================================================================
          BOTTOM-RIGHT CORNER HUD: Bracket + Status Checksum
          ==================================================================== */}
      <div className="anime-hud-corner absolute right-2.5 bottom-3 hidden flex-col items-end justify-end gap-1 lg:flex">
        <div className="mr-0.5 flex flex-col items-end gap-1 border-r border-accent/30 py-1 pr-2 font-mono text-[8px] tracking-widest text-faint/75">
          <span>10 VOLS</span>
          <span>v2026</span>
        </div>

        <div className="relative pr-2.5 pb-2 text-right">
          {/* Bottom-Right L-Bracket */}
          <span className="absolute right-0 bottom-0 h-4 w-4 border-r-2 border-b-2 border-accent/65" />
          <span className="absolute right-0 bottom-0 h-1.5 w-1.5 bg-accent" />

          <div className="flex items-center justify-end gap-1.5 font-mono text-[9px] tracking-widest text-muted/85 uppercase">
            <span>ONLINE</span>
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </div>

          {/* Segmented Checksum Bar */}
          <div className="mt-1 flex items-center justify-end gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className="h-1 w-2 rounded-[1px] bg-accent/55 last:bg-accent"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

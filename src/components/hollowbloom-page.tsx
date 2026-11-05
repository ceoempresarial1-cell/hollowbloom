import { useEffect, useRef, useState } from "react";

const prices = [
  { name: "Fullsuit", image: "/prices/fullsuit.png" },
  { name: "Full partial", image: "/prices/full-partial.png" },
  { name: "Mini partial", image: "/prices/mini-partial.png" },
  { name: "Head", image: "/prices/head.png" },
] as const;

const works = ["Partials", "Heads", "Paws", "Feetpaws", "Bodies", "Digitigrade", "Plantigrade"] as const;

const terms = [
  "Commissions, when they open, are for adults.",
  "No copyrighted characters, and nothing built to look like one.",
  "Say what the cryptid is. A front, a back, and the face is enough.",
  "Cryptid Bunny can turn a design down. Kindness is the whole tone.",
  "Black fur is the base. Pink, plum, yellow, and red sit on top.",
  "Split dye, bows, doll lashes, and platform paws are the house style.",
  "Changes after a look is locked get talked through before any work moves.",
  "You will see the suit while it is being built, not only at the end.",
];

type View = "browse" | "terms" | "prices" | "gallery";

function ExampleIcon({ kind }: { kind: View }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 48 48" className="h-8 w-8" aria-hidden="true">
      {kind === "terms" ? (
        <path
          {...common}
          d="M24 40s-13-8.2-13-17.2C11 17.2 14.6 14 18.6 14c2.4 0 4.4 1.2 5.4 3 1-1.8 3-3 5.4-3 4 0 7.6 3.2 7.6 8.8C37 31.8 24 40 24 40z"
        />
      ) : null}
      {kind === "prices" ? (
        <>
          <rect {...common} x="10" y="14" width="28" height="20" rx="3" />
          <path {...common} d="M16 22h16M16 28h10" />
        </>
      ) : null}
      {kind === "gallery" ? (
        <>
          <rect {...common} x="8" y="12" width="32" height="24" rx="3" />
          <path {...common} d="M8 30l8-7 6 5 5-4 9 8" />
          <circle {...common} cx="18" cy="19" r="2" />
        </>
      ) : null}
    </svg>
  );
}

export function HollowbloomPage() {
  const [confused, setConfused] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [view, setView] = useState<View>("browse");
  const revertTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (revertTimer.current) window.clearTimeout(revertTimer.current);
    };
  }, []);

  function open(next: View) {
    setView(next);
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  }

  function pokeBunny() {
    if (shaking) return;
    setShaking(true);
  }

  function bunnySettled() {
    if (!shaking) return;
    setShaking(false);
    setConfused(true);
    if (revertTimer.current) window.clearTimeout(revertTimer.current);
    revertTimer.current = window.setTimeout(() => setConfused(false), 3000);
  }

  return (
    <div className="room min-h-screen">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:bg-pink focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to the top
      </a>

      <button
        type="button"
        aria-label={confused ? "Confused cryptid bunny" : "Cryptid bunny"}
        onClick={pokeBunny}
        onAnimationEnd={bunnySettled}
        className={
          "fixed right-3 bottom-3 z-20 border-0 bg-transparent p-0 sm:right-4 sm:bottom-4 " +
          (shaking ? "bunny-shake" : "")
        }
      >
        <img
          src={confused ? "/confused.png" : "/logo.png"}
          alt=""
          className="h-20 w-auto outline-none sm:h-24"
        />
      </button>

      <main id="top" className="mx-auto max-w-xl px-4 py-10 sm:px-5 sm:py-14">
        <div className="plaque px-5 py-10 sm:px-8 sm:py-12">
          <header className="text-center">
            <h1>
              <img
                src="/wordmark.png"
                alt="Cryptid Bunny"
                className="mx-auto w-full max-w-sm outline-none"
              />
            </h1>
            <p className="mt-3 text-lg font-bold">Scary-cute cryptid fursuit maker</p>
            <p className="mt-2 font-extrabold tracking-wide text-pink uppercase">Lookbook open</p>
            <button
              type="button"
              onClick={() => open("browse")}
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#7a2e68] px-6 text-sm font-extrabold tracking-widest text-[#6b2454] uppercase"
            >
              Browse
            </button>
          </header>

          <div className="mt-10 border-t border-pink/40" />

          {view === "browse" ? (
            <div id="browse">
              {(
                [
                  ["terms", "Terms of service"],
                  ["prices", "Fursuit prices"],
                  ["gallery", "Gallery"],
                ] as const
              ).map(([id, title]) => (
                <div key={id} className="flex items-center gap-4 border-b border-pink/40 py-5 last:border-b-0">
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border-2 border-[#c45a88] bg-white/40 text-[#c45a88]">
                    <ExampleIcon kind={id} />
                  </div>
                  <h2 className="flex-1 text-left text-xl font-extrabold text-blush">{title}</h2>
                  <button
                    type="button"
                    onClick={() => open(id)}
                    className="inline-flex min-h-11 items-center font-extrabold tracking-widest text-pink uppercase"
                  >
                    See more
                  </button>
                </div>
              ))}
            </div>
          ) : null}

          {view === "terms" ? (
            <section className="pt-10 text-center">
              <p className="text-lg tracking-widest text-pink">♡ ♡ ♡</p>
              <h2 className="mt-2 text-3xl font-extrabold text-blush">Terms of service</h2>
              <p className="mt-3 text-ash">♡ please read these before you ask, cutie ♡</p>
              <div
                role="img"
                aria-label="Terms image"
                className="mx-auto mt-5 aspect-[4/3] w-full max-w-xs rounded-3xl border-2 border-dashed border-[#c45a88] bg-white/35"
              />
              <ul className="mt-8 flex flex-col gap-4 text-left text-ash">
                {terms.map((point) => (
                  <li key={point} className="border-l-2 border-lilac pl-3">
                    {point} ♡
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => open("browse")}
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#7a2e68] px-6 text-sm font-extrabold tracking-widest text-[#6b2454] uppercase"
              >
                Back
              </button>
            </section>
          ) : null}

          {view === "prices" ? (
            <section className="pt-10">
              <h2 className="text-center text-3xl font-extrabold text-blush">Fursuit prices</h2>
              <ul className="mt-8 flex flex-col gap-4">
                {prices.map((item) => (
                  <li key={item.name} className="flex items-center gap-4">
                    <div className="grid h-20 w-20 shrink-0 place-items-center rounded-2xl border-[7px] border-[#c45a88] bg-white">
                      <img src={item.image} alt="" className="h-14 w-14 object-contain outline-none" />
                    </div>
                    <span className="text-lg font-extrabold text-blush">{item.name}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => open("browse")}
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#7a2e68] px-6 text-sm font-extrabold tracking-widest text-[#6b2454] uppercase"
              >
                Back
              </button>
            </section>
          ) : null}

          {view === "gallery" ? (
            <section className="pt-10">
              {works.map((work) => (
                <div key={work} className="mb-8">
                  <h2 className="mb-3 text-center text-sm font-extrabold tracking-widest text-pink uppercase">
                    {work}
                  </h2>
                  <ul className="grid grid-cols-2 gap-3">
                    {[0, 1].map((slot) => (
                      <li key={slot}>
                        <div
                          role="img"
                          aria-label={work}
                          className="aspect-square rounded-2xl border-2 border-dashed border-[#c45a88] bg-white/35"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button
                type="button"
                onClick={() => open("browse")}
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#7a2e68] px-6 text-sm font-extrabold tracking-widest text-[#6b2454] uppercase"
              >
                Back
              </button>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}

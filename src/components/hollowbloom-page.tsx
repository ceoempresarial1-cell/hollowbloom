import { useEffect, useRef, useState, type AnimationEvent } from "react";

const prices = [
  { name: "Fullsuit", image: "/prices/fullsuit-v2.png" },
  { name: "Full partial", image: "/prices/full-partial.webp" },
  { name: "Mini partial", image: "/prices/mini-partial.webp" },
  { name: "Head", image: "/prices/head.webp" },
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

const bunnyLines = ["hii <3", "hehe", "hihi!", "helloo", ":3", "teehee", "^^", "ehe"];

type View = "browse" | "terms" | "prices" | "gallery";

const cards = [
  {
    id: "terms",
    title: "Terms of service",
    blurb: "Everything to know before you ask for a suit.",
    image: "/logo.png",
  },
  {
    id: "prices",
    title: "Fursuit prices",
    blurb: "Mini partial, full partial, head, and fullsuit.",
    image: "/prices/fullsuit-v2.png",
  },
  {
    id: "gallery",
    title: "Gallery",
    blurb: "Partials, heads, paws, and the rest of the work.",
    image: "/talk.png",
  },
] as const;

export function HollowbloomPage() {
  const [face, setFace] = useState<"normal" | "confused" | "talk">("normal");
  const [phase, setPhase] = useState<"idle" | "wobble" | "squish" | "rise">("idle");
  const [view, setView] = useState<View>("browse");
  const revertTimer = useRef<number | null>(null);
  const nextFace = useRef<"normal" | "confused" | "talk">("normal");
  const afterRise = useRef<(() => void) | null>(null);
  const faceRef = useRef(face);
  const phaseRef = useRef(phase);
  faceRef.current = face;
  phaseRef.current = phase;

  const lineIndex = useRef(0);
  const [line, setLine] = useState<string | null>(null);
  const talkRef = useRef<() => void>(() => {});

  function queueSquish(to: "normal" | "confused" | "talk", then?: () => void) {
    nextFace.current = to;
    afterRise.current = then ?? null;
    setPhase("squish");
  }

  talkRef.current = () => {
    if (phaseRef.current !== "idle") return;
    const back = faceRef.current === "talk" ? "normal" : faceRef.current;
    if (revertTimer.current) window.clearTimeout(revertTimer.current);
    setLine(bunnyLines[lineIndex.current % bunnyLines.length]);
    lineIndex.current += 1;
    queueSquish("talk", () => {
      revertTimer.current = window.setTimeout(() => {
        setLine(null);
        queueSquish(back, () => {
          if (back === "confused") {
            revertTimer.current = window.setTimeout(() => queueSquish("normal"), 3000);
          }
        });
      }, 2000);
    });
  };

  useEffect(() => {
    const show = () => talkRef.current();
    const first = window.setTimeout(show, 2000);
    const every = window.setInterval(show, 10000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(every);
    };
  }, []);

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
    if (phase !== "idle" || face !== "normal") return;
    if (revertTimer.current) window.clearTimeout(revertTimer.current);
    setPhase("wobble");
    nextFace.current = "confused";
    afterRise.current = () => {
      revertTimer.current = window.setTimeout(() => queueSquish("normal"), 3000);
    };
  }

  function bunnySettled(event: AnimationEvent<HTMLButtonElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.animationName === "bunny-shake") {
      setPhase("squish");
      return;
    }
    if (event.animationName === "bunny-squish") {
      setFace(nextFace.current);
      setPhase("rise");
      return;
    }
    if (event.animationName === "bunny-rise") {
      setPhase("idle");
      const then = afterRise.current;
      afterRise.current = null;
      then?.();
    }
  }

  return (
    <div className="room min-h-screen">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:bg-pink focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to the top
      </a>

      <div className="fixed right-3 bottom-3 z-20 sm:right-4 sm:bottom-4">
        {line ? (
          <p className="bunny-bubble" aria-live="polite">
            {line}
          </p>
        ) : null}
        <button
          type="button"
          aria-label={face === "talk" ? "Talking cryptid bunny" : face === "confused" ? "Confused cryptid bunny" : "Cryptid bunny"}
          onClick={pokeBunny}
          onAnimationEnd={bunnySettled}
          className={
            "border-0 bg-transparent p-0 " +
            (phase === "wobble" ? "bunny-shake" : phase === "squish" ? "bunny-squish" : phase === "rise" ? "bunny-rise" : "")
          }
        >
          <img
            src={face === "talk" ? "/talk.png" : face === "confused" ? "/confused.png" : "/logo.png"}
            alt=""
            className="h-20 w-auto outline-none sm:h-24"
          />
        </button>
      </div>

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
            <div id="browse" className="flex flex-col">
              {cards.map((card) => (
                <article key={card.id} className="flex items-center gap-4 border-b border-pink/40 py-8 last:border-b-0">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-extrabold tracking-widest text-blush uppercase">
                      ☆ {card.title} ☆
                    </h2>
                    <p className="mt-3 text-ash">{card.blurb}</p>
                    <button
                      type="button"
                      onClick={() => open(card.id)}
                      className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#7a2e68] px-6 text-xs font-extrabold tracking-widest text-[#6b2454] uppercase"
                    >
                      See more
                    </button>
                  </div>
                  <img src={card.image} alt="" className="h-32 w-28 shrink-0 object-contain outline-none sm:h-40 sm:w-36" />
                </article>
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
                    <div className="shrink-0 rounded-2xl border-[7px] border-[#c45a88] bg-white p-2">
                      <img src={item.image} alt="" className="h-auto w-44 outline-none sm:w-52" />
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

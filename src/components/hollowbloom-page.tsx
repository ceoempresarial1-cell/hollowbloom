import { useEffect, useMemo, useRef, useState } from "react";
import { cryptids, findCryptid, piece, repo, wardrobe, type Wear } from "@/data/catalog";

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

export function HollowbloomPage() {
  const [cryptidId, setCryptidId] = useState(cryptids[0].id);
  const [wear, setWear] = useState<Wear>(cryptids[0].wear);
  const look = findCryptid(cryptidId);

  const dressed = useMemo(() => {
    return {
      upper: piece("upper", wear.upper),
      lower: piece("lower", wear.lower),
      legs: piece("legs", wear.legs),
      feet: piece("feet", wear.feet),
      face: piece("face", wear.face),
    };
  }, [wear]);

  function setLayer(layer: keyof Wear, id: string) {
    setWear((current) => ({ ...current, [layer]: id }));
  }

  const [confused, setConfused] = useState(false);
  const [shaking, setShaking] = useState(false);
  const [view, setView] = useState<"browse" | "terms">("browse");
  const revertTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (revertTimer.current) window.clearTimeout(revertTimer.current);
    };
  }, []);

  function openTerms() {
    setView("terms");
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  }

  function backToBrowse() {
    setView("browse");
    document.getElementById("browse")?.scrollIntoView({ behavior: "smooth" });
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
          <a
            href="#browse"
            onClick={() => setView("browse")}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#7a2e68] px-6 text-sm font-extrabold tracking-widest text-[#6b2454] uppercase"
          >
            Browse
          </a>
          <nav className="mt-2 flex flex-col items-center" aria-label="Atelier">
            <a href="#doll" className="inline-flex min-h-11 items-center font-bold text-ash hover:text-blush">
              The doll
            </a>
            <a href="#den" className="inline-flex min-h-11 items-center font-bold text-ash hover:text-blush">
              The den
            </a>
            <a
              href={repo}
              className="inline-flex min-h-11 items-center font-bold text-ash hover:text-blush"
            >
              GitHub
            </a>
          </nav>
        </header>

        <div className="mt-10 border-t border-pink/40" />

        {view === "terms" ? (
          <section id="terms" className="pt-10 text-center">
            <p className="text-lg tracking-widest text-pink">♡ ♡ ♡</p>
            <h2 className="mt-2 text-3xl font-extrabold text-blush">Terms of service</h2>
            <p className="mt-3 text-ash">♡ please read these before you ask, cutie ♡</p>
            <ul className="mt-8 flex flex-col gap-4 text-left text-ash">
              {terms.map((point) => (
                <li key={point} className="border-l-2 border-lilac pl-3">
                  {point} ♡
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={backToBrowse}
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#7a2e68] px-6 text-sm font-extrabold tracking-widest text-[#6b2454] uppercase"
            >
              Back
            </button>
          </section>
        ) : (
          <div id="browse">
            <section className="border-b border-pink/40 py-8 text-center">
              <p className="text-lg tracking-widest text-pink">♡ ♡ ♡</p>
              <h2 className="mt-2 text-2xl font-extrabold text-blush">Terms of service</h2>
              <p className="mt-2 text-ash">♡ cutecore house rules, read with hearts ♡</p>
              <div
                role="img"
                aria-label="Terms image"
                className="mx-auto mt-5 aspect-[4/3] w-full max-w-xs rounded-3xl border-2 border-dashed border-[#c45a88] bg-white/35"
              />
              <button
                type="button"
                onClick={openTerms}
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#7a2e68] px-6 text-sm font-extrabold tracking-widest text-[#6b2454] uppercase"
              >
                See more
              </button>
            </section>

            <section id="prices" className="flex items-center gap-4 border-b border-pink/40 py-8">
              <div
                role="img"
                aria-label="Prices image"
                className="h-24 w-24 shrink-0 rounded-2xl border-2 border-dashed border-[#c45a88] bg-white/35"
              />
              <h2 className="text-2xl font-extrabold text-blush">Fursuit prices</h2>
            </section>

            <section id="gallery" className="pt-8">
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
            </section>
          </div>
        )}

        <section id="doll" className="scroll-mt-8 pt-16">
          <h2 className="text-center text-3xl font-extrabold text-blush">The doll</h2>
          <p className="mt-3 text-center text-ash">
            Cozy on top, chunky underneath. The look stays fragile and a little mean.
          </p>
          <p className="mt-6 text-center text-lg font-extrabold text-blush">{look.name}</p>
          <p className="mt-1 text-center text-sm text-ash">
            {dressed.upper?.name}. {dressed.lower?.name}. {dressed.legs?.name}. {dressed.feet?.name}.{" "}
            {dressed.face?.name}.
          </p>
          <div className="mt-8 flex flex-col gap-6">
            {wardrobe.map((layer) => (
              <fieldset key={layer.id}>
                <legend className="text-sm font-extrabold tracking-widest text-pink uppercase">
                  {layer.label}
                </legend>
                <div className="mt-2 flex flex-col gap-2">
                  {layer.pieces.map((option) => {
                    const on = wear[layer.id] === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => setLayer(layer.id, option.id)}
                        className={
                          "min-h-11 rounded-2xl border px-4 py-3 text-left " +
                          (on
                            ? "border-[#7a2e68] bg-pink text-ink"
                            : "border-[#7a2e68]/40 bg-white/45 text-[#4a1840]")
                        }
                      >
                        <span className="block font-extrabold">{option.name}</span>
                        <span className={"mt-1 block text-sm " + (on ? "text-ink/80" : "text-ash")}>
                          {option.note}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </div>
        </section>

        <section id="care" className="scroll-mt-8 pt-16">
          <h2 className="text-center text-3xl font-extrabold text-blush">Fursuit care</h2>
          <p className="mt-3 text-center text-ash">Brush it. Air it. Wash it when it asks.</p>
          <div className="mt-8 flex flex-col gap-6 text-ash">
            <div>
              <h3 className="text-sm font-extrabold tracking-widest text-lilac uppercase">Every wear</h3>
              <p className="mt-2">
                Cool the head on a fan. Brush the fur in the direction it lies. Pink dye stays put if you
                do not soak it for fun.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-widest text-mint uppercase">A real wash</h3>
              <p className="mt-2">
                Surface clean first. A tub wash only when it needs one, then dry completely before the
                suit goes back on a stand. No heat.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-extrabold tracking-widest text-sky uppercase">Repairs</h3>
              <p className="mt-2">
                Loose stitches and a tired bow can come home. Write what broke. Do not send a dirty suit.
              </p>
            </div>
          </div>
        </section>

        <section id="den" className="scroll-mt-8 pt-16">
          <h2 className="text-center text-3xl font-extrabold text-blush">The den</h2>
          <p className="mt-3 text-center text-ash">A cartoon haunted house. No overhead white light.</p>
          <ul className="mt-6 flex flex-col gap-4">
            <li>
              <p className="font-extrabold text-pink">Plush pile</p>
              <p className="text-sm text-ash">Bats, ribbed kittens, and three-eyed unicorns on a pink faux-fur rug.</p>
            </li>
            <li>
              <p className="font-extrabold text-lilac">Neon</p>
              <p className="text-sm text-ash">Bat and moon lamps. Skull boxes glowing pink.</p>
            </li>
            <li>
              <p className="font-extrabold text-mint">Vanity</p>
              <p className="text-sm text-ash">Ghost candles with bows, and a wall of cute-mean frames.</p>
            </li>
          </ul>
        </section>
        </div>
      </main>
    </div>
  );
}

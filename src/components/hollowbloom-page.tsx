import { useEffect, useRef, useState, type AnimationEvent } from "react";

const prices = [
  { name: { en: "Fullsuit", es: "Fullsuit" }, image: "/prices/fullsuit-v2.png", range: { en: "800 to 1k+", es: "800 a 1k+" } },
  { name: { en: "Full partial", es: "Full partial" }, image: "/prices/full-partial.webp", range: { en: "300 to 450", es: "300 a 450" } },
  { name: { en: "Mini partial", es: "Mini partial" }, image: "/prices/mini-partial.webp", range: { en: "250 to 300", es: "250 a 300" } },
  { name: { en: "Head", es: "Cabeza" }, image: "/prices/head.webp", range: { en: "150 to 250", es: "150 a 250" } },
] as const;

const works = [
  { en: "Partials", es: "Partials" },
  { en: "Heads", es: "Cabezas" },
  { en: "Paws", es: "Patas" },
  { en: "Feetpaws", es: "Feetpaws" },
  { en: "Bodies", es: "Cuerpos" },
  { en: "Digitigrade", es: "Digitigrade" },
  { en: "Plantigrade", es: "Plantigrade" },
] as const;

const copy = {
  en: {
    skip: "Skip to the top",
    form: "Application form",
    formNote: "This link is the commission application form.",
    tagline: "Beginner fursuit maker ♡",
    open: "Commissions open",
    browse: "Browse",
    more: "See more",
    back: "Back",
    termsTitle: "Terms of service",
    termsBlurb: "Please review these before requesting a commission.",
    termsLead: "Please read these terms before requesting a commission.",
    pricesTitle: "Fursuit prices",
    pricesBlurb: "Mini partial, full partial, head, and fullsuit.",
    galleryTitle: "Gallery",
    galleryBlurb: "Partials, heads, paws, and the rest of the work.",
    terms: [
      "Commissions are open to adults, and to minors who have a parent or guardian's permission.",
      "A quote does not reserve a spot. A spot is held only after payment is received.",
      "All types of fursonas and furry characters are accepted.",
      "A special price may apply if a clear example of what you are looking for has not been made yet.",
      "Quotes are estimates. The final price is confirmed in writing before any payment.",
      "Changes after a design is approved are discussed before any further work is done.",
      "Progress is shown while the suit is being built, not only when it is finished.",
    ],
  },
  es: {
    skip: "Saltar al inicio",
    form: "Formulario de solicitud",
    formNote: "Este enlace es el formulario de solicitud.",
    tagline: "Principiante fursuit maker ♡",
    open: "Comisiones abiertas",
    browse: "Explorar",
    more: "Ver más",
    back: "Volver",
    termsTitle: "Términos de servicio",
    termsBlurb: "Léelos antes de pedir una comisión.",
    termsLead: "Lee estos términos antes de pedir una comisión.",
    pricesTitle: "Precios de fursuit",
    pricesBlurb: "Mini partial, full partial, cabeza y fullsuit.",
    galleryTitle: "Galería",
    galleryBlurb: "Partials, cabezas, patas y el resto del trabajo.",
    terms: [
      "Las comisiones están abiertas para adultos y para menores con permiso de un padre o tutor.",
      "Una cotización no reserva un lugar. El lugar queda reservado solo cuando se recibe el pago.",
      "Se aceptan todo tipo de fursonas y personajes furry.",
      "Puede haber un precio especial si todavía no hay un ejemplo claro de lo que buscas.",
      "Las cotizaciones son estimados. El precio final se confirma por escrito antes de cualquier pago.",
      "Los cambios después de aprobar un diseño se hablan antes de continuar el trabajo.",
      "El avance se muestra mientras se construye, no solo al terminar.",
    ],
  },
} as const;

type Lang = keyof typeof copy;

const bunnyLines = ["hii <3", "hehe", "hihi!", "helloo", ":3", "teehee", "^^", "ehe"];

type View = "browse" | "terms" | "prices" | "gallery";

const cards = [
  { id: "terms", image: "/logo.png" },
  { id: "prices", image: "/confused-v2.png" },
  { id: "gallery", image: "/talk.png" },
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
  const [priceTalking, setPriceTalking] = useState(false);
  const [pricePhase, setPricePhase] = useState<"idle" | "squish" | "rise">("idle");
  const [lang, setLang] = useState<Lang>("en");
  const talkRef = useRef<() => void>(() => {});
  const text = copy[lang];

  useEffect(() => {
    const saved = window.localStorage.getItem("cryptid-bunny-lang");
    if (saved === "es" || saved === "en") setLang(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    window.localStorage.setItem("cryptid-bunny-lang", lang);
  }, [lang]);

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
    const id = window.setInterval(() => {
      setPricePhase((current) => (current === "idle" ? "squish" : current));
    }, 2000);
    return () => {
      window.clearInterval(id);
      if (revertTimer.current) window.clearTimeout(revertTimer.current);
    };
  }, []);

  function priceSettled(event: AnimationEvent<HTMLImageElement>) {
    if (event.target !== event.currentTarget) return;
    if (event.animationName === "bunny-squish") {
      setPriceTalking((talking) => !talking);
      setPricePhase("rise");
      return;
    }
    if (event.animationName === "bunny-rise") setPricePhase("idle");
  }

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
        {text.skip}
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
            src={face === "talk" ? "/talk.png" : face === "confused" ? "/confused-v2.png" : "/logo.png"}
            alt=""
            className="h-20 w-auto outline-none sm:h-24"
          />
        </button>
      </div>

      <main id="top" className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="plaque px-8 py-14 sm:px-12 sm:py-16">
          <header className="text-center">
            <div className="mb-6 flex justify-center" role="tablist" aria-label={lang === "es" ? "Idioma" : "Language"}>
              {(["en", "es"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  role="tab"
                  aria-selected={lang === option}
                  onClick={() => setLang(option)}
                  className={
                    "min-h-11 border-2 border-[#e56aa8] px-5 text-sm font-extrabold tracking-widest uppercase first:rounded-l-full last:rounded-r-full " +
                    (lang === option ? "bg-white text-[#e56aa8]" : "bg-transparent text-[#e56aa8]")
                  }
                >
                  {option === "en" ? "English" : "Español"}
                </button>
              ))}
            </div>
            <a
              href="https://forms.gle/mRGiMVYqkNigZrft9"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#e56aa8] bg-white px-6 text-sm font-extrabold tracking-widest text-[#e56aa8] uppercase"
            >
              {text.form}
            </a>
            <p className="mt-2 text-ash">{text.formNote}</p>
            <h1 className="mt-6">
              <img
                src="/wordmark.png"
                alt="Cryptid Bunny"
                className="mx-auto w-full max-w-sm outline-none"
              />
            </h1>
            <p className="mt-3 text-lg font-bold">{text.tagline}</p>
            <p className="mt-2 font-extrabold tracking-wide text-pink uppercase">{text.open}</p>
            <button
              type="button"
              onClick={() => open("browse")}
              className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#e56aa8] px-6 text-sm font-extrabold tracking-widest text-[#e56aa8] uppercase"
            >
              {text.browse}
            </button>
          </header>

          <div className="mt-10 border-t border-pink/40" />

          {view === "browse" ? (
            <div id="browse" className="flex flex-col">
              {cards.map((card) => (
                <article key={card.id} className="flex items-center gap-4 border-b border-pink/40 py-8 last:border-b-0">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-extrabold tracking-widest text-blush uppercase">
                      ☆ {card.id === "terms" ? text.termsTitle : card.id === "prices" ? text.pricesTitle : text.galleryTitle} ☆
                    </h2>
                    <p className="mt-3 text-ash">
                      {card.id === "terms" ? text.termsBlurb : card.id === "prices" ? text.pricesBlurb : text.galleryBlurb}
                    </p>
                    <button
                      type="button"
                      onClick={() => open(card.id)}
                      className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#e56aa8] px-6 text-xs font-extrabold tracking-widest text-[#e56aa8] uppercase"
                    >
                      {text.more}
                    </button>
                  </div>
                  <img src={card.image} alt="" className="h-44 w-40 shrink-0 object-contain outline-none sm:h-56 sm:w-52" />
                </article>
              ))}
            </div>
          ) : null}

          {view === "terms" ? (
            <section className="pt-10">
              <div className="flex items-center gap-4">
                <img src="/terms-wordmark.png" alt="" className="h-28 w-auto shrink-0 outline-none sm:h-36" />
                <h2 className="text-left text-3xl font-extrabold text-blush">{text.termsTitle}</h2>
              </div>
              <p className="mt-4 text-ash">{text.termsLead}</p>
              <ul className="mt-8 flex flex-col gap-4 text-left text-ash">
                {text.terms.map((point) => (
                  <li key={point} className="border-l-2 border-lilac pl-3">
                    {point}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => open("browse")}
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#e56aa8] px-6 text-sm font-extrabold tracking-widest text-[#e56aa8] uppercase"
              >
                {text.back}
              </button>
            </section>
          ) : null}

          {view === "prices" ? (
            <section className="pt-10">
              <h2 className="mx-auto w-fit rounded-2xl border-[12px] border-[#e56aa8] bg-white px-10 py-6 text-center text-3xl font-extrabold text-blush">
                {text.pricesTitle}
              </h2>
              <ul className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8">
                {prices.map((item, index) => (
                  <li key={item.name.en} className="flex flex-col items-center text-center">
                    <img src={item.image} alt="" className="h-auto w-full object-contain outline-none" />
                    <p className="is-title mt-3 w-full rounded-2xl border-[12px] border-[#e56aa8] bg-white px-5 py-5 text-xl text-blush">
                      {item.name[lang]}
                    </p>
                    <div className="mt-3 flex flex-col items-center gap-2">
                      <span className="grid h-28 w-28 place-items-center">
                        <img
                          src={priceTalking ? "/talk-price.png" : "/logo.png"}
                          alt=""
                          onAnimationEnd={index === 0 ? priceSettled : undefined}
                          className={
                            "h-28 w-28 object-contain outline-none " +
                            (pricePhase === "squish"
                              ? "bunny-squish"
                              : pricePhase === "rise"
                                ? "bunny-rise"
                                : "price-hop")
                          }
                        />
                      </span>
                      <p className="price-bubble">{item.range[lang]}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => open("browse")}
                className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#e56aa8] px-6 text-sm font-extrabold tracking-widest text-[#e56aa8] uppercase"
              >
                {text.back}
              </button>
            </section>
          ) : null}

          {view === "gallery" ? (
            <section className="pt-10">
              {works.map((work) => (
                <div key={work.en} className="mb-8">
                  <h2 className="mb-3 text-center text-sm font-extrabold tracking-widest text-pink uppercase">
                    {work[lang]}
                  </h2>
                  <ul className="grid grid-cols-2 gap-3">
                    {[0, 1].map((slot) => (
                      <li key={slot}>
                        <div
                          role="img"
                          aria-label={work[lang]}
                          className="aspect-square rounded-2xl border-2 border-dashed border-[#e56aa8] bg-white/35"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <button
                type="button"
                onClick={() => open("browse")}
                className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-[#e56aa8] px-6 text-sm font-extrabold tracking-widest text-[#e56aa8] uppercase"
              >
                {text.back}
              </button>
            </section>
          ) : null}
        </div>
      </main>
    </div>
  );
}

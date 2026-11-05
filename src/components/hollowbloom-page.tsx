import { useMemo, useState } from "react";
import { cryptids, findCryptid, piece, repo, wardrobe, type Wear } from "@/data/catalog";

const jumps = [
  {
    href: "#rules",
    title: "House rules",
    blurb: "What to know before you ask for a cryptid.",
    action: "Read",
  },
  {
    href: "#faq",
    title: "FAQ",
    blurb: "How a suit gets from the closet to you.",
    action: "Read",
  },
  {
    href: "#prices",
    title: "Prices",
    blurb: "Not posted yet. The lookbook is the offer for now.",
    action: "Read",
  },
  {
    href: "#gallery",
    title: "Gallery",
    blurb: "Meet the cryptids. Newest mood, oldest teeth.",
    action: "Browse",
  },
  {
    href: "#doll",
    title: "The doll",
    blurb: "Layer a sweater, a skirt, and a pair of boots.",
    action: "Dress",
  },
  {
    href: "#care",
    title: "Fursuit care",
    blurb: "How to keep the fur soft and a little mean.",
    action: "Read",
  },
  {
    href: "#den",
    title: "The den",
    blurb: "The room they stand in when nobody is wearing them.",
    action: "See",
  },
];

const rules = [
  {
    title: "General",
    points: [
      "Commissions, when they open, are for adults.",
      "No copyrighted characters, and nothing built to look like one.",
      "Say what the cryptid is. A reference with a front, a back, and the face is enough.",
      "Cryptid Bunny can turn a design down. Kindness is the whole tone.",
    ],
  },
  {
    title: "Making",
    points: [
      "Black fur is the base. Pink, plum, yellow, and red sit on top.",
      "Split dye, bows, doll lashes, and platform paws are the house style.",
      "Changes after a look is locked get talked through before any work moves.",
      "You will see the suit while it is being built, not only at the end.",
    ],
  },
];

const faqs = [
  {
    q: "How do I get a suit from here?",
    a: "Browse the gallery, dress a doll so the look is clear, then wait. Applications are not open on this page yet.",
  },
  {
    q: "When do applications open?",
    a: "When a batch of cryptids is finished. This page is the place that will say so.",
  },
  {
    q: "How much does a suit cost?",
    a: "Prices are not posted yet. Do not guess from the lookbook.",
  },
  {
    q: "Which creatures can you make?",
    a: "The six in the gallery are the house set: moth, hare, water-horse, spade, fox, and owl. Other furry cryptids can be talked through later. Nothing borrowed from a studio that owns the character.",
  },
  {
    q: "Can I wear it hard?",
    a: "Yes. Care is brushing, cool air, and a wash when it needs one. See Fursuit care.",
  },
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

  function choose(id: string) {
    const next = findCryptid(id);
    setCryptidId(next.id);
    setWear(next.wear);
  }

  function setLayer(layer: keyof Wear, id: string) {
    setWear((current) => ({ ...current, [layer]: id }));
  }

  return (
    <div className="room min-h-screen">
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:bg-pink focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to the top
      </a>

      <main id="top" className="mx-auto max-w-xl px-5 pt-16 pb-24">
        <header className="text-center">
          <img
            src="/logo.png"
            alt="Cryptid Bunny logo"
            className="mx-auto h-56 w-auto outline-none"
          />
          <h1 className="drip mt-2 text-5xl text-blush sm:text-6xl">
            <span className="text-pink">Cryptid</span> Bunny
          </h1>
          <p className="mt-4 text-lg text-blush">Scary-cute cryptid fursuit maker</p>
          <p className="mt-3 font-extrabold tracking-wide text-mint uppercase">Lookbook open</p>
          <a
            href="#gallery"
            className="mt-6 inline-flex min-h-11 items-center justify-center px-4 text-lg font-extrabold tracking-widest text-pink uppercase"
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

        <ul>
          {jumps.map((item) => (
            <li key={item.href} className="border-b border-pink/40 py-8 text-center">
              <p className="text-2xl font-extrabold text-blush">{item.title}</p>
              <p className="mt-2 text-ash">{item.blurb}</p>
              <a
                href={item.href}
                className="mt-2 inline-flex min-h-11 items-center font-extrabold tracking-widest text-pink uppercase"
              >
                {item.action}
              </a>
            </li>
          ))}
        </ul>

        <section id="rules" className="scroll-mt-8 pt-16">
          <h2 className="text-center text-3xl font-extrabold text-blush">House rules</h2>
          <p className="mt-3 text-center text-ash">Read this before you ask for a suit.</p>
          <div className="mt-8 flex flex-col gap-8">
            {rules.map((group) => (
              <div key={group.title}>
                <h3 className="text-sm font-extrabold tracking-widest text-pink uppercase">{group.title}</h3>
                <ul className="mt-3 flex flex-col gap-2 text-ash">
                  {group.points.map((point) => (
                    <li key={point} className="border-l-2 border-lilac pl-3">
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="faq" className="scroll-mt-8 pt-16">
          <h2 className="text-center text-3xl font-extrabold text-blush">FAQ</h2>
          <p className="mt-3 text-center text-ash">Short answers. The long ones live in the rules.</p>
          <dl className="mt-8 flex flex-col gap-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-extrabold text-blush">Q: {item.q}</dt>
                <dd className="mt-1 text-ash">A: {item.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="prices" className="scroll-mt-8 pt-16 text-center">
          <h2 className="text-3xl font-extrabold text-blush">Prices</h2>
          <p className="mt-3 text-ash">
            Not posted yet. Nothing on this page is for sale, and no number here is a quote.
          </p>
        </section>

        <section id="gallery" className="scroll-mt-8 pt-16">
          <h2 className="text-center text-3xl font-extrabold text-blush">Gallery</h2>
          <p className="mt-3 text-center text-ash">Meet the family. Pick one, then dress it.</p>
          <ul className="mt-8 flex flex-col gap-8">
            {cryptids.map((item) => (
              <li key={item.id} className="border-b border-pink/40 pb-8 text-center last:border-b-0">
                <h3 className="text-xl font-extrabold text-blush">{item.name}</h3>
                <p className="text-sm font-bold tracking-widest text-mint uppercase">{item.epithet}</p>
                <p className="mt-1 text-ash">{item.blurb}</p>
                <a
                  href="#doll"
                  onClick={() => choose(item.id)}
                  className="mt-1 inline-flex min-h-11 items-center font-extrabold tracking-widest text-pink uppercase"
                >
                  Dress
                </a>
              </li>
            ))}
          </ul>
        </section>

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
                            ? "border-pink bg-pink text-ink"
                            : "border-pink/40 bg-panel text-blush hover:border-lilac")
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
      </main>
    </div>
  );
}

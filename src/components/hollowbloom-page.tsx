import { useMemo, useState } from "react";
import { atelierImage, cryptids, findCryptid, piece, repo, wardrobe, type Wear } from "@/data/catalog";

const links = [
  { href: "#closet", label: "Closet" },
  { href: "#doll", label: "Doll" },
  { href: "#room", label: "Room" },
];

export function HollowbloomPage() {
  const [cryptidId, setCryptidId] = useState(cryptids[0].id);
  const [wear, setWear] = useState<Wear>(cryptids[0].wear);
  const look = findCryptid(cryptidId);

  const dressed = useMemo(() => {
    const upper = piece("upper", wear.upper);
    const lower = piece("lower", wear.lower);
    const legs = piece("legs", wear.legs);
    const feet = piece("feet", wear.feet);
    const face = piece("face", wear.face);
    return { upper, lower, legs, feet, face };
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
        href="#closet"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:bg-pink focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to the closet
      </a>
      <header className="sticky top-0 z-20 border-b border-pink/40 bg-ink/90 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl flex-wrap gap-1 px-4 py-2" aria-label="Atelier">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-bold text-ash hover:text-blush"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-20 pt-6">
        <section id="closet" className="scroll-mt-20">
          <p className="text-xs font-extrabold tracking-widest text-pink uppercase">Scary cute</p>
          <h1 className="drip mt-2 text-5xl sm:text-7xl">
            <span className="text-pink">soft</span> <span className="text-blush">teeth.</span>
          </h1>
          <p className="mt-3 max-w-xl text-lg text-ash">
            Cryptids dressed like a haunted bedroom. Black holds the shape. Baby
            pink, lilac, mint, and sky sit on top, split down the middle.
          </p>

          <figure className="sticker mt-6 p-3">
            <div className="relative">
              <img
                src={look.image}
                alt={`${look.name}, ${look.epithet}`}
                className="aspect-3/4 w-full rounded-2xl object-cover sm:aspect-video sm:object-top"
              />
              <figcaption className="absolute inset-x-0 bottom-0 rounded-b-2xl bg-gradient-to-t from-ink via-ink/85 to-transparent p-4 sm:p-6">
                <p className="text-xs font-extrabold tracking-widest text-mint uppercase">{look.epithet}</p>
                <p className="font-sans text-3xl font-extrabold text-blush">{look.name}</p>
                <p className="max-w-lg text-sm text-ash">{look.blurb}</p>
              </figcaption>
            </div>
          </figure>

          <ul className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {cryptids.map((item) => {
              const on = item.id === cryptidId;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => choose(item.id)}
                    aria-pressed={on}
                    className={
                      "w-full overflow-hidden rounded-2xl text-left " +
                      (on ? "ring-2 ring-mint" : "ring-2 ring-transparent hover:ring-pink")
                    }
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="aspect-3/4 w-full object-cover"
                    />
                    <span className="block truncate px-1 py-2 text-center text-xs font-bold text-blush">
                      {item.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="doll" className="scroll-mt-20 pt-16">
          <p className="text-xs font-extrabold tracking-widest text-lilac uppercase">The doll</p>
          <h2 className="mt-2 font-sans text-3xl font-extrabold text-blush sm:text-4xl">
            Dress the fright.
          </h2>
          <p className="mt-2 max-w-xl text-ash">
            Cozy on top, chunky underneath. Pick a layer. The look stays fragile
            and a little mean.
          </p>

          <div className="mt-6 grid items-start gap-4 lg:grid-cols-2">
            <article className="sticker p-3">
              <img
                src={look.image}
                alt=""
                className="aspect-3/4 w-full rounded-2xl object-cover"
              />
              <div className="px-2 pt-4 pb-2">
                <p className="text-xs font-extrabold tracking-widest text-sky uppercase">On the stand</p>
                <p className="mt-2 text-lg font-extrabold text-blush">{look.name}</p>
                <p className="mt-2 text-sm text-ash">
                  {dressed.upper?.name}. {dressed.lower?.name}. {dressed.legs?.name}.{" "}
                  {dressed.feet?.name}. {dressed.face?.name}.
                </p>
              </div>
            </article>

            <div className="flex flex-col gap-5">
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
          </div>
        </section>

        <section id="room" className="scroll-mt-20 pt-16">
          <p className="text-xs font-extrabold tracking-widest text-mint uppercase">The den</p>
          <h2 className="mt-2 font-sans text-3xl font-extrabold text-blush sm:text-4xl">
            A cartoon haunted house.
          </h2>
          <figure className="sticker mt-6 p-3">
            <img
              src={atelierImage}
              alt="Black room with pink neon, pastel plush bats, and cryptid suits on stands"
              className="aspect-video w-full rounded-2xl object-cover"
            />
          </figure>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            <li className="rounded-2xl bg-panel p-4">
              <p className="font-extrabold text-pink">Plush pile</p>
              <p className="mt-1 text-sm text-ash">
                Bats, ribbed kittens, and three-eyed unicorns on a pink faux-fur rug.
              </p>
            </li>
            <li className="rounded-2xl bg-panel p-4">
              <p className="font-extrabold text-lilac">Neon, not daylight</p>
              <p className="mt-1 text-sm text-ash">
                Bat and moon lamps. Skull boxes glowing pink. No harsh white lights.
              </p>
            </li>
            <li className="rounded-2xl bg-panel p-4">
              <p className="font-extrabold text-mint">Vanity</p>
              <p className="mt-1 text-sm text-ash">
                Ghost candles with bows, pink pumpkin dishes, a wall of cute-mean frames.
              </p>
            </li>
          </ul>
        </section>
      </main>

      <footer className="border-t border-pink/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-ash">A scary-cute cryptid closet. Nothing for sale on this page.</p>
          <a href={repo} className="inline-flex min-h-11 items-center text-sm font-bold text-pink">
            Project on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

import { useEffect, useMemo, useState } from "react";
import { Check, Copy, Github, Heart, Sparkles } from "lucide-react";
import {
  STUDIO,
  addons,
  atelierImage,
  bases,
  findBase,
  findSpecies,
  money,
  quoteTotal,
  species,
  splitPay,
  type BaseId,
} from "@/data/catalog";

const SLIP_KEY = "hollowbloom-slips";

type Slip = {
  id: string;
  at: string;
  name: string;
  contact: string;
  notes: string;
  speciesId: string;
  baseId: BaseId;
  addonIds: string[];
  total: number;
};

const nav = [
  { href: "#card", label: "The card" },
  { href: "#cryptids", label: "Cryptids" },
  { href: "#prices", label: "Prices" },
  { href: "#quote", label: "Quote" },
];

function readSlips(): Slip[] {
  try {
    const raw = localStorage.getItem(SLIP_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Slip[];
    return Array.isArray(parsed) ? parsed.slice(0, 6) : [];
  } catch {
    return [];
  }
}

function slipText(slip: {
  name: string;
  contact: string;
  notes: string;
  speciesId: string;
  baseId: BaseId;
  addonIds: string[];
  total: number;
}) {
  const look = findSpecies(slip.speciesId);
  const base = findBase(slip.baseId);
  const picked = addons.filter((item) => slip.addonIds.includes(item.id));
  const pay = splitPay(slip.total);
  const lines = [
    `${STUDIO.name} commission slip`,
    `For: ${slip.name || "—"}`,
    slip.contact ? `Contact: ${slip.contact}` : "",
    `Cryptid: ${look.name}`,
    `Base: ${base.name} — ${money(base.price)}`,
    picked.length
      ? `Add-ons:\n${picked.map((item) => `- ${item.name} — ${money(item.price)}`).join("\n")}`
      : "Add-ons: none",
    `Total: ${money(slip.total)}`,
    `Deposit 40%: ${money(pay.deposit)}`,
    `At foam approval 40%: ${money(pay.midpoint)}`,
    `Before ship 20%: ${money(pay.finale)}`,
    slip.notes ? `Notes: ${slip.notes}` : "",
    "Planning card only — Hollowbloom does not collect payment here.",
  ];
  return lines.filter(Boolean).join("\n");
}

export function HollowbloomPage() {
  const [speciesId, setSpeciesId] = useState(species[0].id);
  const [baseId, setBaseId] = useState<BaseId>("partial");
  const [addonIds, setAddonIds] = useState<string[]>(species[0].signature);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [notes, setNotes] = useState("");
  const [nameError, setNameError] = useState("");
  const [slips, setSlips] = useState<Slip[]>([]);
  const [copied, setCopied] = useState(false);

  const look = findSpecies(speciesId);
  const base = findBase(baseId);
  const total = useMemo(() => quoteTotal(baseId, addonIds), [baseId, addonIds]);
  const pay = splitPay(total);

  useEffect(() => {
    setSlips(readSlips());
  }, []);

  function chooseSpecies(id: string) {
    const next = findSpecies(id);
    setSpeciesId(next.id);
    setAddonIds(next.signature);
  }

  function toggleAddon(id: string) {
    setAddonIds((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  async function copySlip() {
    const text = slipText({ name, contact, notes, speciesId, baseId, addonIds, total });
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  function saveSlip() {
    const trimmed = name.trim();
    if (!trimmed) {
      setNameError("Add a name so the slip has someone to belong to.");
      return;
    }
    setNameError("");
    const next: Slip = {
      id: `${Date.now()}`,
      at: new Date().toISOString(),
      name: trimmed,
      contact: contact.trim(),
      notes: notes.trim(),
      speciesId,
      baseId,
      addonIds,
      total,
    };
    const stored = [next, ...readSlips()].slice(0, 6);
    localStorage.setItem(SLIP_KEY, JSON.stringify(stored));
    setSlips(stored);
  }

  return (
    <div className="doll min-h-screen">
      <a
        href="#card"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-30 focus:bg-pink focus:px-3 focus:py-2 focus:text-ink"
      >
        Skip to the card
      </a>
      <header className="sticky top-0 z-20 border-b border-pink/30 bg-ink/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <a href="#top" className="flex items-center gap-2 text-blush">
            <Heart className="size-5 text-pink" aria-hidden="true" />
            <span className="font-display text-lg tracking-wide">Hollowbloom</span>
          </a>
          <nav className="flex flex-wrap gap-1" aria-label="On this card">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-full px-3 text-sm text-ash hover:text-blush"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="top" className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:pt-12">
        <section id="card" className="grid scroll-mt-24 items-start gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <p className="flex items-center gap-2 text-xs font-semibold tracking-widest text-pink uppercase">
              <Sparkles className="size-4" aria-hidden="true" />
              Cute goth fursuit atelier
            </p>
            <h1 className="split-dye font-display text-4xl leading-tight sm:text-6xl">
              Black boots. Pink cryptids.
            </h1>
            <p className="max-w-xl text-lg text-ash">
              Oversized bows on black fur, split-dye pink, doll lashes, and platform
              paws. Lilac, mint, and sky sit on top so the suit looks soft and a
              little intimidating.
            </p>
            <ul className="flex flex-wrap gap-2" aria-label="Palette">
              <li className="inline-flex min-h-11 items-center gap-2 rounded-full bg-panel px-3 text-sm text-blush">
                <span className="size-3 rounded-full bg-pink" /> Pink
              </li>
              <li className="inline-flex min-h-11 items-center gap-2 rounded-full bg-panel px-3 text-sm text-blush">
                <span className="size-3 rounded-full bg-lilac" /> Lilac
              </li>
              <li className="inline-flex min-h-11 items-center gap-2 rounded-full bg-panel px-3 text-sm text-blush">
                <span className="size-3 rounded-full bg-mint" /> Mint
              </li>
              <li className="inline-flex min-h-11 items-center gap-2 rounded-full bg-panel px-3 text-sm text-blush">
                <span className="size-3 rounded-full bg-sky" /> Sky
              </li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <a
                href="#quote"
                className="inline-flex min-h-11 items-center rounded-full bg-pink px-5 font-semibold text-ink"
              >
                Build a quote
              </a>
              <a
                href="#prices"
                className="inline-flex min-h-11 items-center rounded-full border border-pink px-5 text-blush"
              >
                Read the prices
              </a>
            </div>
            <dl className="grid grid-cols-3 gap-3 pt-2">
              <div>
                <dt className="text-xs tracking-wide text-ash uppercase">Open slots</dt>
                <dd className="font-display text-2xl text-blush tabular-nums">{STUDIO.slots}</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-ash uppercase">Deposit</dt>
                <dd className="font-display text-2xl text-blush">40%</dd>
              </div>
              <div>
                <dt className="text-xs tracking-wide text-ash uppercase">Handoff</dt>
                <dd className="font-display text-lg text-blush sm:text-2xl">{STUDIO.season}</dd>
              </div>
            </dl>
          </div>

          <article className="frame p-3 sm:p-4" aria-label="Hollowbloom commission card">
            <img
              src={atelierImage}
              alt="Cute goth atelier with pink-and-black moth, jackalope, kelpie, and owl fursuits"
              className="aspect-video w-full rounded-lg object-cover"
            />
            <div className="px-2 pt-4 pb-2 sm:px-3">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs tracking-widest text-pink uppercase">Commission card</p>
                  <h2 className="font-display text-2xl text-blush">Starting floors</h2>
                </div>
                <p className="text-right text-sm text-ash">
                  {STUDIO.slots} slots
                  <br />
                  {STUDIO.season}
                </p>
              </div>
              <ul className="mt-3">
                {bases.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-baseline justify-between gap-3 border-b border-pink/25 py-2 text-sm"
                  >
                    <span className="text-blush">{item.name}</span>
                    <span className="font-semibold text-pink tabular-nums">{money(item.price)}</span>
                  </li>
                ))}
              </ul>
              <p className="pt-3 text-sm text-ash">
                Floors, not ceilings. Bows, split-dye, and platform paws sit above the number.
              </p>
            </div>
          </article>
        </section>

        <section id="cryptids" className="scroll-mt-24 pt-16">
          <div className="mb-6 max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-pink uppercase">The menagerie</p>
            <h2 className="mt-2 font-display text-3xl text-blush sm:text-4xl">Six cryptids, ready to wear.</h2>
            <p className="mt-3 text-ash">
              Pick a look and its signature pieces land on the quote. Uncheck anything
              that is not your cryptid.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {species.map((item) => {
              const selected = item.id === speciesId;
              const from = quoteTotal("partial", item.signature);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => chooseSpecies(item.id)}
                    aria-pressed={selected}
                    className={
                      "frame flex h-full w-full flex-col p-3 text-left transition " +
                      (selected ? "ring-2 ring-mint" : "hover:ring-2 hover:ring-pink")
                    }
                  >
                    <img
                      src={item.image}
                      alt={`${item.name}, a ${item.epithet.toLowerCase()} fursuit`}
                      className="aspect-3/4 w-full rounded-lg object-cover"
                    />
                    <div className="flex flex-1 flex-col gap-1 px-1 pt-3 pb-1">
                      <p className="text-xs tracking-widest text-pink uppercase">{item.epithet}</p>
                      <h3 className="font-display text-xl text-blush">{item.name}</h3>
                      <p className="text-sm text-ash">{item.blurb}</p>
                      <p className="mt-auto pt-3 text-sm font-semibold text-blush tabular-nums">
                        Partial from {money(from)}
                      </p>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        <section id="prices" className="scroll-mt-24 pt-16">
          <div className="mb-6 max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-pink uppercase">The ledger</p>
            <h2 className="mt-2 font-display text-3xl text-blush sm:text-4xl">What the work costs.</h2>
            <p className="mt-3 text-ash">
              Paid in three beats: 40% to hold the slot, 40% when the foam is approved,
              20% before it ships. Turnaround runs about eight to fourteen months.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="frame p-4 sm:p-6">
              <h3 className="font-display text-xl text-blush">Bases</h3>
              <ul className="mt-3">
                {bases.map((item) => (
                  <li key={item.id} className="border-b border-pink/25 py-3 last:border-b-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-blush">{item.name}</span>
                      <span className="text-pink tabular-nums">{money(item.price)}</span>
                    </div>
                    <p className="mt-1 text-sm text-ash">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="frame p-4 sm:p-6">
              <h3 className="font-display text-xl text-blush">Add-ons</h3>
              <ul className="mt-3">
                {addons.map((item) => (
                  <li key={item.id} className="border-b border-pink/25 py-3 last:border-b-0">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-semibold text-blush">{item.name}</span>
                      <span className="text-pink tabular-nums">{money(item.price)}</span>
                    </div>
                    <p className="mt-1 text-sm text-ash">{item.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="quote" className="scroll-mt-24 pt-16">
          <div className="mb-6 max-w-2xl">
            <p className="text-xs font-semibold tracking-widest text-pink uppercase">Your slip</p>
            <h2 className="mt-2 font-display text-3xl text-blush sm:text-4xl">
              Price {look.name}.
            </h2>
            <p className="mt-3 text-ash">
              Signature pieces are already checked. The total updates as you edit.
              Nothing here is a charge — save or copy the slip for your own notes.
            </p>
          </div>

          <div className="grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="frame flex flex-col gap-6 p-4 sm:p-6">
              <fieldset>
                <legend className="font-display text-lg text-blush">Cryptid</legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {species.map((item) => {
                    const on = item.id === speciesId;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        aria-pressed={on}
                        onClick={() => chooseSpecies(item.id)}
                        className={
                          "min-h-11 rounded-full px-4 text-sm " +
                          (on ? "bg-pink font-semibold text-ink" : "border border-pink/50 text-blush")
                        }
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-display text-lg text-blush">Base</legend>
                <div className="mt-3 flex flex-col gap-2">
                  {bases.map((item) => (
                    <label
                      key={item.id}
                      className={
                        "flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl border px-3 py-2 " +
                        (item.id === baseId ? "border-mint bg-ink" : "border-pink/30")
                      }
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="base"
                          value={item.id}
                          checked={item.id === baseId}
                          onChange={() => setBaseId(item.id)}
                          className="size-4 accent-pink"
                        />
                        <span>
                          <span className="block text-blush">{item.name}</span>
                          <span className="block text-sm text-ash">{item.detail}</span>
                        </span>
                      </span>
                      <span className="shrink-0 text-pink tabular-nums">{money(item.price)}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <fieldset>
                <legend className="font-display text-lg text-blush">Add-ons</legend>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  {addons.map((item) => {
                    const on = addonIds.includes(item.id);
                    return (
                      <label
                        key={item.id}
                        className={
                          "flex min-h-11 cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 " +
                          (on ? "border-mint bg-ink" : "border-pink/30")
                        }
                      >
                        <input
                          type="checkbox"
                          checked={on}
                          onChange={() => toggleAddon(item.id)}
                          className="mt-1 size-4 accent-pink"
                        />
                        <span className="min-w-0">
                          <span className="flex items-baseline justify-between gap-2">
                            <span className="text-blush">{item.name}</span>
                            <span className="text-sm text-pink tabular-nums">{money(item.price)}</span>
                          </span>
                          <span className="block text-sm text-ash">{item.detail}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block text-sm text-ash">
                  Name
                  <input
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      if (nameError) setNameError("");
                    }}
                    autoComplete="name"
                    className="mt-1 min-h-11 w-full rounded-xl border border-pink/40 bg-ink px-3 text-blush"
                  />
                </label>
                <label className="block text-sm text-ash">
                  Contact
                  <input
                    value={contact}
                    onChange={(event) => setContact(event.target.value)}
                    autoComplete="email"
                    placeholder="Email or handle"
                    className="mt-1 min-h-11 w-full rounded-xl border border-pink/40 bg-ink px-3 text-blush placeholder:text-ash/70"
                  />
                </label>
                <label className="block text-sm text-ash sm:col-span-2">
                  Notes
                  <textarea
                    value={notes}
                    onChange={(event) => setNotes(event.target.value)}
                    rows={3}
                    placeholder="Colors, refs, deadline wishes"
                    className="mt-1 w-full rounded-xl border border-pink/40 bg-ink px-3 py-3 text-blush placeholder:text-ash/70"
                  />
                </label>
              </div>
              {nameError ? (
                <p className="text-sm text-pink" role="alert">
                  {nameError}
                </p>
              ) : null}
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={saveSlip}
                  className="inline-flex min-h-11 items-center rounded-full bg-pink px-5 font-semibold text-ink"
                >
                  Save slip on this device
                </button>
                <button
                  type="button"
                  onClick={copySlip}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-pink px-5 text-blush"
                >
                  {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                  {copied ? "Copied" : "Copy slip"}
                </button>
              </div>
            </div>

            <aside className="frame sticky top-24 p-4 sm:p-5">
              <p className="text-xs tracking-widest text-pink uppercase">{look.name}</p>
              <h3 className="mt-1 font-display text-2xl text-blush">{base.name}</h3>
              <p className="mt-2 text-sm text-ash">{look.blurb}</p>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <dt className="text-ash">Base</dt>
                  <dd className="text-blush tabular-nums">{money(base.price)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ash">Add-ons</dt>
                  <dd className="text-blush tabular-nums">{money(total - base.price)}</dd>
                </div>
                <div className="flex justify-between gap-3 border-t border-pink/30 pt-2 text-base">
                  <dt className="font-semibold text-blush">Total</dt>
                  <dd className="font-semibold text-pink tabular-nums">{money(total)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ash">Deposit</dt>
                  <dd className="text-blush tabular-nums">{money(pay.deposit)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ash">Foam approval</dt>
                  <dd className="text-blush tabular-nums">{money(pay.midpoint)}</dd>
                </div>
                <div className="flex justify-between gap-3">
                  <dt className="text-ash">Before ship</dt>
                  <dd className="text-blush tabular-nums">{money(pay.finale)}</dd>
                </div>
              </dl>
            </aside>
          </div>

          <div className="mt-4 frame p-4 sm:p-6">
            <h3 className="font-display text-xl text-blush">Saved on this device</h3>
            {slips.length === 0 ? (
              <p className="mt-2 text-sm text-ash">
                No slips yet. Build a quote and save it — it stays in this browser only.
              </p>
            ) : (
              <ul className="mt-3 divide-y divide-pink/25">
                {slips.map((slip) => (
                  <li key={slip.id} className="flex flex-wrap items-baseline justify-between gap-2 py-3">
                    <div>
                      <p className="text-blush">
                        {slip.name} · {findSpecies(slip.speciesId).name}
                      </p>
                      <p className="text-sm text-ash">
                        {findBase(slip.baseId).name} · {slip.at.slice(0, 16).replace("T", " ")}
                      </p>
                    </div>
                    <p className="font-semibold text-pink tabular-nums">{money(slip.total)}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-pink/30">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-ash">
            Hollowbloom is a planning card for cryptid fursuit commissions. It does not
            take payment.
          </p>
          <a
            href={STUDIO.repo}
            className="inline-flex min-h-11 items-center gap-2 text-sm text-pink"
          >
            <Github className="size-4" aria-hidden="true" />
            New project on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}

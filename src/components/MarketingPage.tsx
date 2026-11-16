import { useEffect, useState } from 'react'
import {
  clients,
  dayRates,
  formatFcfa,
  gallery,
  packages,
  services,
  site,
  steps,
} from '../data/site'
import { QuoteForm } from './QuoteForm'

const cdn = (src: string, w: number) =>
  `/.netlify/images?url=${encodeURIComponent(src)}&w=${w}&fm=webp&q=78`

const nav = [
  { href: '#services', label: 'Services' },
  { href: '#realisations', label: 'Réalisations' },
  { href: '#formules', label: 'Formules' },
  { href: '#deroulement', label: 'Déroulement' },
]

const ticker = [
  'Mariages',
  'Anniversaires',
  'Cultes & célébrations',
  'Concerts',
  'Conférences',
  'Forums jeunesse',
  'Événements d’entreprise',
  'Spectacles',
]

function useTimecode() {
  const [tc, setTc] = useState('00:00:00:00')
  useEffect(() => {
    const start = performance.now()
    const id = window.setInterval(() => {
      const ms = performance.now() - start
      const f = Math.floor((ms % 1000) / 40)
      const s = Math.floor(ms / 1000)
      const pad = (n: number) => String(n).padStart(2, '0')
      setTc(
        `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}:${pad(f)}`,
      )
    }, 40)
    return () => window.clearInterval(id)
  }, [])
  return tc
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function SectionHead({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string
  title: string
  accent?: string
  children?: React.ReactNode
}) {
  return (
    <div className="reveal mb-14 grid gap-6 md:grid-cols-[1fr_minmax(0,28rem)] md:items-end">
      <div>
        <p className="eyebrow mb-5">{eyebrow}</p>
        <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
          {title}{' '}
          {accent && (
            <em className="font-serif font-normal italic text-ember">
              {accent}
            </em>
          )}
        </h2>
      </div>
      {children && <div className="text-mute leading-relaxed">{children}</div>}
    </div>
  )
}

export function MarketingPage() {
  const [packageId, setPackageId] = useState('impact')
  const [menuOpen, setMenuOpen] = useState(false)
  const tc = useTimecode()
  useReveal()

  return (
    <>
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-cream/10 bg-ink/70 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <a href="#top" className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-ember font-display text-sm font-extrabold text-ink">
              JK
            </span>
            <span className="font-display text-lg font-bold tracking-tight">
              Event Media
            </span>
          </a>
          <nav aria-label="Navigation principale" className="hidden md:block">
            <ul className="flex items-center gap-8 text-sm font-medium">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="text-cream/80 transition hover:text-ember"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex items-center gap-3">
            <a href="#devis" className="btn hidden !px-5 !py-2.5 !text-sm sm:inline-flex">
              Demander un devis
            </a>
            <button
              type="button"
              className="grid size-10 place-items-center rounded-full border border-cream/20 md:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label="Menu"
              onClick={() => setMenuOpen((o) => !o)}
            >
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 h-0.5 w-4 bg-cream transition ${menuOpen ? 'top-1.5 rotate-45' : 'top-0'}`}
                />
                <span
                  className={`absolute left-0 h-0.5 w-4 bg-cream transition ${menuOpen ? 'top-1.5 -rotate-45' : 'top-2.5'}`}
                />
              </span>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-menu" aria-label="Menu mobile" className="border-t border-cream/10 md:hidden">
            <ul className="flex flex-col px-5 py-4">
              {[...nav, { href: '#devis', label: 'Demander un devis' }].map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 font-display text-2xl font-semibold"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main id="top">
        {/* Hero */}
        <section className="viewfinder relative flex min-h-[100svh] items-end overflow-hidden">
          <img
            src={cdn('/img/hero.png', 1920)}
            srcSet={`${cdn('/img/hero.png', 900)} 900w, ${cdn('/img/hero.png', 1400)} 1400w, ${cdn('/img/hero.png', 1920)} 1920w`}
            sizes="100vw"
            alt="Couple de mariés dansant sous les guirlandes lumineuses, photographié par JK Event Media"
            className="absolute inset-0 size-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-transparent to-transparent" />
          <span className="vf tl hidden sm:block !top-24" />
          <span className="vf tr hidden sm:block !top-24" />
          <span className="vf bl hidden sm:block" />
          <span className="vf br hidden sm:block" />

          <div className="absolute right-6 top-24 hidden items-center gap-3 font-mono text-xs tracking-widest text-cream/90 sm:right-14 sm:top-28 sm:flex">
            <span className="live-dot" /> REC
            <span className="tabular-nums text-cream/70">{tc}</span>
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 pt-40 sm:px-8 sm:pb-24">
            <p className="eyebrow rise mb-6">
              <span className="live-dot" /> En direct de Bouaké
            </p>
            <h1 className="rise max-w-5xl font-display text-[clamp(3rem,9vw,8.5rem)] font-extrabold leading-[0.9] tracking-[-0.03em] [animation-delay:120ms]">
              Vis ta cérémonie
              <br />
              <em className="font-serif font-normal italic tracking-normal text-ember">
                en temps réel.
              </em>
            </h1>
            <div className="rise mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between [animation-delay:260ms]">
              <p className="max-w-lg text-lg leading-relaxed text-cream/85">
                Photographie, vidéo, montage et design graphique pour vos
                mariages, cultes, concerts et événements — des images soignées,
                partagées pendant l’événement ou dans les meilleurs délais.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="#devis" className="btn">
                  Réserver ma date <span aria-hidden>→</span>
                </a>
                <a href="#realisations" className="btn-ghost">
                  Voir les réalisations
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Ticker */}
        <div className="overflow-hidden border-y border-cream/10 bg-ember py-4 text-ink" aria-hidden>
          <div className="marquee">
            {[...ticker, ...ticker, ...ticker, ...ticker].map((t, i) => (
              <span key={i} className="flex items-center gap-8 px-4 font-display text-xl font-bold uppercase tracking-tight">
                {t}
                <span className="size-2 rounded-full bg-ink" />
              </span>
            ))}
          </div>
        </div>

        {/* About */}
        <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:items-center">
            <div className="reveal">
              <p className="eyebrow mb-6">La maison</p>
              <p className="font-display text-3xl font-medium leading-[1.2] tracking-tight sm:text-[2.6rem]">
                Chaque événement a son atmosphère, ses temps forts et ses
                personnes à mettre en valeur. Nous les{' '}
                <em className="font-serif italic text-ember">conservons</em>, les{' '}
                <em className="font-serif italic text-ember">racontons</em> et leur
                donnons une visibilité au-delà du lieu où ils se déroulent.
              </p>
            </div>
            <div className="reveal grid grid-cols-2 gap-4">
              <figure className="col-span-1 row-span-2 overflow-hidden">
                <img
                  src={cdn('/img/videographer.png', 700)}
                  alt="Vidéaste de JK Event Media filmant une cérémonie"
                  loading="lazy"
                  className="aspect-[3/4] size-full object-cover"
                />
              </figure>
              <div className="flex flex-col justify-between border border-cream/15 p-6">
                <span className="font-display text-5xl font-extrabold text-ember">4</span>
                <span className="text-sm text-mute">métiers réunis : photo, vidéo, montage, design</span>
              </div>
              <div className="flex flex-col justify-between bg-ink-3 p-6">
                <span className="font-display text-5xl font-extrabold">Gbêkê</span>
                <span className="text-sm text-mute">Basés à Bouaké, disponibles dans toute la Côte d’Ivoire sur demande</span>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="scroll-mt-20 bg-ink-2 py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHead eyebrow="Nos domaines" title="Tout ce qu’il faut pour" accent="raconter votre jour.">
              Selon l’ampleur de votre événement, nous mobilisons photographie,
              cadrage, montage, reportage, animation ou voix off — l’équipe est
              composée en fonction de votre projet.
            </SectionHead>
            <div className="grid border-t border-cream/15 md:grid-cols-2">
              {services.map((s, i) => (
                <article
                  key={s.id}
                  className={`reveal group border-b border-cream/15 py-10 md:px-10 ${i % 2 === 0 ? 'md:border-r md:pl-0' : 'md:pr-0'}`}
                >
                  <div className="mb-6 flex items-baseline justify-between">
                    <span className="font-mono text-sm text-ember">{s.index}</span>
                    <span className="h-px flex-1 mx-6 bg-cream/10 transition group-hover:bg-ember/60" />
                  </div>
                  <h3 className="font-display text-3xl font-bold tracking-tight mb-3">{s.title}</h3>
                  <p className="font-serif text-xl italic text-cream/80 mb-6">{s.lead}</p>
                  <ul className="space-y-2.5 text-mute">
                    {s.items.map((it) => (
                      <li key={it} className="flex gap-3">
                        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-ember" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section id="realisations" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <SectionHead eyebrow="Réalisations" title="Des instants," accent="pas des clichés.">
            Mariages, cultes, concerts, forums, anniversaires : un aperçu des
            ambiances que nous capturons à Bouaké et alentour.
          </SectionHead>
          <div className="grid auto-rows-[220px] grid-cols-2 gap-3 sm:auto-rows-[260px] md:grid-cols-4">
            {gallery.map((g) => (
              <figure
                key={g.src}
                className={`reveal group relative overflow-hidden bg-ink-3 ${g.span === 'tall' ? 'row-span-2' : 'col-span-2'}`}
              >
                <img
                  src={cdn(g.src, g.span === 'tall' ? 700 : 1100)}
                  alt={g.alt}
                  loading="lazy"
                  className="size-full object-cover transition duration-700 group-hover:scale-105"
                />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/90 to-transparent p-5 pt-16">
                  <span className="font-display text-lg font-semibold">{g.label}</span>
                  <span className="font-mono text-xs text-cream/60 opacity-0 transition group-hover:opacity-100">
                    ● REC
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* Live feature */}
        <section className="relative overflow-hidden border-y border-cream/10 bg-ink-3">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-2 lg:items-center">
            <div className="reveal">
              <p className="eyebrow mb-6">
                <span className="live-dot" /> Contenus en temps réel
              </p>
              <h2 className="font-display text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">
                Vos proches loin de Bouaké ?{' '}
                <em className="font-serif font-normal italic text-ember">Ils y sont aussi.</em>
              </h2>
              <p className="mt-6 max-w-lg leading-relaxed text-mute">
                Selon la formule choisie, nous produisons et transmettons des
                photos et des formats courts pendant l’événement ou juste après —
                prêts pour Facebook, TikTok, Instagram et WhatsApp.
              </p>
            </div>
            <div className="reveal grid grid-cols-3 gap-3">
              {['Facebook', 'TikTok', 'Instagram', 'WhatsApp', 'Photos HD', 'Film souvenir'].map((p, i) => (
                <div
                  key={p}
                  className={`flex aspect-square flex-col justify-between border p-4 ${i === 1 ? 'border-ember bg-ember text-ink' : 'border-cream/15'}`}
                >
                  <span className="font-mono text-[10px] tracking-widest opacity-70">
                    0{i + 1}
                  </span>
                  <span className="font-display text-base font-bold sm:text-lg">{p}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Clients */}
        <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <SectionHead eyebrow="Pour qui" title="Une clientèle aussi variée que" accent="vos célébrations." />
          <ul className="grid gap-px overflow-hidden border border-cream/10 bg-cream/10 sm:grid-cols-2 lg:grid-cols-5">
            {clients.map((c) => (
              <li key={c.title} className="reveal bg-ink p-7 transition hover:bg-ink-2">
                <h3 className="font-display text-xl font-bold mb-3">{c.title}</h3>
                <p className="text-sm leading-relaxed text-mute">{c.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Packages */}
        <section id="formules" className="scroll-mt-20 bg-ink-2 py-28">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHead eyebrow="Formules & tarifs" title="Trois formules," accent="un devis sur mesure.">
              Le contenu exact de chaque formule — durée, nombre de photos,
              format vidéo, équipe et délais — est précisé dans votre devis.
            </SectionHead>
            <div className="grid gap-5 lg:grid-cols-3">
              {packages.map((p) => (
                <article
                  key={p.id}
                  className={`reveal relative flex flex-col p-8 sm:p-10 ${p.featured ? 'bg-cream text-ink' : 'border border-cream/15'}`}
                >
                  {p.featured && (
                    <span className="absolute right-6 top-6 rounded-full bg-ember px-3 py-1 text-xs font-bold uppercase tracking-wider text-ink">
                      Le plus demandé
                    </span>
                  )}
                  <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${p.featured ? 'text-ink/60' : 'text-mute'}`}>
                    {p.positioning}
                  </p>
                  <h3 className="mt-3 font-display text-4xl font-extrabold tracking-tight">{p.name}</h3>
                  <p className="mt-8 font-display text-5xl font-extrabold tracking-tight">
                    {formatFcfa(p.price).replace(' FCFA', '')}
                    <span className="ml-2 text-lg font-semibold">FCFA</span>
                  </p>
                  <p className={`mt-6 flex-1 leading-relaxed ${p.featured ? 'text-ink/75' : 'text-mute'}`}>
                    {p.description}
                  </p>
                  <a
                    href="#devis"
                    onClick={() => setPackageId(p.id)}
                    className={`mt-10 ${p.featured ? 'btn !bg-ink !text-cream hover:!bg-ink-3' : 'btn-ghost'}`}
                  >
                    Choisir {p.name} <span aria-hidden>→</span>
                  </a>
                </article>
              ))}
            </div>
            <div className="reveal mt-5 grid gap-px border border-cream/15 bg-cream/15 sm:grid-cols-2">
              {dayRates.map((r) => (
                <div key={r.label} className="flex flex-wrap items-baseline justify-between gap-3 bg-ink-2 px-8 py-6">
                  <span className="text-mute">{r.label}</span>
                  <span className="font-display text-xl font-bold">{r.value}</span>
                </div>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-sm text-mute">
              Tarifs indicatifs. Le prix définitif dépend de la nature de
              l’événement, de la durée de couverture, du nombre d’intervenants,
              des livrables attendus et des éventuels frais de déplacement.
            </p>
          </div>
        </section>

        {/* Process */}
        <section id="deroulement" className="scroll-mt-20 mx-auto max-w-7xl px-5 py-28 sm:px-8">
          <SectionHead eyebrow="Déroulement" title="De votre premier message" accent="à la livraison.">
            Un accord clair avant l’événement — date, lieu, durée, livrables,
            prix et délais — pour une prestation sans surprise.
          </SectionHead>
          <ol className="grid gap-px bg-cream/10 md:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.title} className="reveal relative bg-ink p-7 pt-10">
                <span className="font-display text-6xl font-extrabold text-cream/10">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mute">{s.text}</p>
                <span className="absolute left-0 top-0 h-0.5 w-10 bg-ember" />
              </li>
            ))}
          </ol>
        </section>

        {/* Quote */}
        <section id="devis" className="scroll-mt-20 relative overflow-hidden border-t border-cream/10">
          <div className="pointer-events-none absolute -right-40 -top-40 size-[36rem] rounded-full bg-ember/15 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-28 sm:px-8 lg:grid-cols-[1fr_1.3fr]">
            <div className="reveal">
              <p className="eyebrow mb-6">Demande de devis</p>
              <h2 className="font-display text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl">
                Parlons de votre{' '}
                <em className="font-serif font-normal italic text-ember">événement.</em>
              </h2>
              <p className="mt-8 max-w-md leading-relaxed text-mute">
                Indiquez la date, le lieu, le type d’événement et ce que vous
                souhaitez. Nous revenons vers vous avec une proposition adaptée à
                votre format et à votre budget.
              </p>
              <dl className="mt-12 space-y-6 border-t border-cream/15 pt-8">
                <div>
                  <dt className="form-label">Zone d’intervention</dt>
                  <dd className="font-display text-xl font-semibold">Bouaké & région du Gbêkê</dd>
                  <dd className="mt-1 text-sm text-mute">Autres localités de Côte d’Ivoire sur demande</dd>
                </div>
                <div>
                  <dt className="form-label">Ce que vous recevez</dt>
                  <dd className="text-mute">Un devis précisant périmètre, livrables, prix et modalités de livraison.</dd>
                </div>
              </dl>
            </div>
            <div className="reveal">
              <QuoteForm packageId={packageId} onPackageChange={setPackageId} />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-cream/10 bg-ink">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <p className="font-display text-[clamp(2.5rem,8vw,7rem)] font-extrabold leading-none tracking-[-0.03em]">
            JK Event Media<span className="text-ember">.</span>
          </p>
          <div className="mt-10 flex flex-col gap-4 text-sm text-mute sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-3">
              <span className="live-dot" /> {site.tagline}
            </p>
            <p>
              {site.location} · © {new Date().getFullYear()}
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

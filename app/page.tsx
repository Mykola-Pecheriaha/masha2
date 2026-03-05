import MasonryGrid from '../components/MasonryGrid'

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-7xl px-6 lg:px-10">
      {/* HERO */}
      <section className="py-16 sm:py-20">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Пластична хірургія
          </p>

          <h1 className="mt-4 text-4xl leading-tight tracking-tight sm:text-5xl">
            Натуральні результати, створені з увагою до деталей.
          </h1>

          <p className="mt-5 text-base leading-relaxed text-foreground/75 sm:text-lg">
            Односторінковий демонстраційний макет з навігацією-якорями.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-sm border border-black bg-black px-6 py-3 text-xs uppercase tracking-[0.15em] text-white transition hover:bg-transparent hover:text-black"
            >
              консультація
            </a>

            <a
              href="#portfolio"
              className="inline-flex items-center justify-center rounded-sm border px-6 py-3 text-xs uppercase tracking-[0.15em] transition hover:text-gray-500"
            >
              Переглянути портфоліо
            </a>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="border-t py-16 sm:py-20">
        <div className="max-w-4xl">
          <h2 className="text-3xl tracking-tight">Портфоліо</h2>

          <div className="mt-8">
            {/* Masonry grid */}
            {/* Using external images as demo; replace with your own public paths */}
            {/* eslint-disable-next-line @next/next/no-img-element */}

            {/* Import dynamically to avoid top-level change warnings */}
            <MasonryGrid />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t py-10 text-sm text-gray-500">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} PlasticP</div>
          <div className="uppercase tracking-[0.18em] text-xs">
            Збудовано з Next.js + Tailwind
          </div>
        </div>
      </footer>
    </main>
  )
}

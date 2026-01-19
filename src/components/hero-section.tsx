import { useEffect, useRef } from "react"
import { CosmicBackground } from "./cosmic-background"

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const scrolled = window.scrollY
        const opacity = Math.max(0, 1 - scrolled / 600)
        sectionRef.current.style.opacity = opacity.toString()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <CosmicBackground />

      <div className="relative z-10 flex flex-col items-center gap-8 px-4 text-center animate-float">
        <div className="relative">
          <div className="absolute inset-0 animate-pulse rounded-full bg-primary/30 blur-3xl" />
          <img
            src="./developer-portrait.png"
            alt="Tu foto"
            className="relative h-48 w-48 rounded-full border-4 border-primary/50 object-cover shadow-2xl shadow-primary/50"
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-balance font-sans text-6xl font-bold tracking-tight text-foreground md:text-8xl">
            Lazaro Yunier
          </h1>
          <p className="text-pretty font-mono text-xl text-muted-foreground md:text-2xl">Desarrollador Full Stack</p>
          <div className="flex items-center justify-center gap-2 text-sm text-accent">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-accent" />
            <span>Disponible para trabajo remoto (20 horas por semana)</span>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <a
            href="#timeline"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50"
          >
            Ver mi trabajo
          </a>
          <a
            href="#contact"
            className="rounded-lg border border-border bg-card/50 px-6 py-3 font-medium text-card-foreground backdrop-blur-sm transition-all hover:bg-card/80"
          >
            Contactar
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg
          className="h-6 w-6 text-muted-foreground"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

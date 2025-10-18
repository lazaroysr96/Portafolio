import { useEffect, useRef } from "react"

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const stars: Array<{
      x: number
      y: number
      radius: number
      vx: number
      vy: number
      opacity: number
      twinkleSpeed: number
    }> = []

    // Crear estrellas
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        opacity: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      })
    }

    let animationFrameId: number

    const animate = () => {
      ctx.fillStyle = "rgba(18, 10, 40, 0.1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        star.x += star.vx
        star.y += star.vy

        // Efecto de parpadeo
        star.opacity += star.twinkleSpeed
        if (star.opacity > 1 || star.opacity < 0.3) {
          star.twinkleSpeed *= -1
        }

        // Rebote en los bordes
        if (star.x < 0 || star.x > canvas.width) star.vx *= -1
        if (star.y < 0 || star.y > canvas.height) star.vy *= -1

        // Dibujar estrella
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(147, 112, 219, ${star.opacity})`
        ctx.fill()

        // Glow effect
        const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.radius * 3)
        gradient.addColorStop(0, `rgba(147, 112, 219, ${star.opacity * 0.5})`)
        gradient.addColorStop(1, "rgba(147, 112, 219, 0)")
        ctx.fillStyle = gradient
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      style={{
        background: "radial-gradient(ellipse at center, #1a0f2e 0%, #0a0515 100%)",
      }}
    />
  )
}

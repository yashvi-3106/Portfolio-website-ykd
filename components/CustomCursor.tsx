"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion, useSpring, frame } from "framer-motion"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  life: number
}

const BASE_W = 20
const BASE_H = 20
const HOVER_H = 32
const PAD_X = 12
const MAX_W = 280

export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const lastTargetRef = useRef<HTMLElement | null>(null)
  const particles = useRef<Particle[]>([])

  // Motion values for smooth bubble
  const springConfig = { stiffness: 400, damping: 40, restDelta: 0.001 }
  const cursorX = useSpring(0, springConfig)
  const cursorY = useSpring(0, springConfig)
  const cursorW = useSpring(BASE_W, springConfig)
  const cursorH = useSpring(BASE_H, springConfig)
  const labelOpacity = useSpring(0, { stiffness: 300, damping: 40 })

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    if (isCoarse) return

    document.body.classList.add("custom-cursor")

    const canvas = canvasRef.current
    const ctx = canvas?.getContext("2d")

    let raf = 0
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let lastX = mouseX
    let lastY = mouseY

    const resize = () => {
      if (canvas) {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
      }
    }

    const onMove = (ev: PointerEvent) => {
      mouseX = ev.clientX
      mouseY = ev.clientY

      // Update bubble position
      frame.read(() => {
        cursorX.set(mouseX)
        cursorY.set(mouseY)
      })

      // Handle data-text detection
      const el = (ev.target as Element | null)?.closest?.<HTMLElement>("[data-text]") ?? null
      if (el !== lastTargetRef.current) {
        lastTargetRef.current = el
        const text = el?.getAttribute("data-text") ?? ""
        const span = labelRef.current

        if (!el || !text) {
          if (span) span.textContent = ""
          frame.read(() => {
            cursorW.set(BASE_W)
            cursorH.set(BASE_H)
            labelOpacity.set(0)
          })
        } else if (span) {
          span.textContent = text
          const textW = Math.ceil(span.scrollWidth)
          const targetW = Math.min(Math.max(BASE_W, textW + PAD_X * 2), MAX_W)
          frame.read(() => {
            cursorW.set(targetW)
            cursorH.set(HOVER_H)
          })
          frame.update(() => labelOpacity.set(1))
        }
      }

      // Spawn particles on canvas
      const dist = Math.hypot(mouseX - lastX, mouseY - lastY)
      if (dist > 1) {
        const count = Math.min(dist * 2, 10)
        for (let i = 0; i < count; i++) {
          particles.current.push({
            x: lastX + (mouseX - lastX) * (i / count),
            y: lastY + (mouseY - lastY) * (i / count),
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: Math.random() * 1.5 + 0.5,
            life: 1
          })
        }
      }
      lastX = mouseX
      lastY = mouseY
    }

    const onLeaveWindow = () => {
      lastTargetRef.current = null
      if (labelRef.current) labelRef.current.textContent = ""
      frame.read(() => {
        cursorW.set(BASE_W)
        cursorH.set(BASE_H)
        labelOpacity.set(0)
      })
    }

    const loop = () => {
      if (ctx && canvas) {
        ctx.globalCompositeOperation = "destination-out"
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.globalCompositeOperation = "source-over"

        for (let i = particles.current.length - 1; i >= 0; i--) {
          const p = particles.current[i]
          p.life -= 0.015
          if (p.life <= 0) {
            particles.current.splice(i, 1)
            continue
          }
          p.x += p.vx
          p.y += p.vy
          p.vx *= 0.99
          p.vy *= 0.99
          ctx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.4})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size * (1 + (1 - p.life) * 2), 0, Math.PI * 2)
          ctx.fill()
        }
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", onMove, { passive: true })
    window.addEventListener("pointerleave", onLeaveWindow)
    resize()
    raf = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove("custom-cursor")
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerleave", onLeaveWindow)
      cancelAnimationFrame(raf)
    }
  }, [cursorX, cursorY, cursorW, cursorH, labelOpacity])

  return (
    <div className="cursor-container" aria-hidden>
      <canvas ref={canvasRef} className="cursor-canvas" />
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          width: cursorW,
          height: cursorH,
        }}
        className="fixed top-0 left-0 pointer-events-none z-[10001] flex items-center justify-center overflow-hidden rounded-full bg-white mix-blend-difference -translate-x-1/2 -translate-y-1/2"
      >
        <motion.span
          ref={labelRef}
          style={{ opacity: labelOpacity }}
          className="relative px-2 text-[10px] font-black uppercase tracking-[0.2em] text-black whitespace-nowrap select-none"
        />
      </motion.div>
    </div>
  )
}

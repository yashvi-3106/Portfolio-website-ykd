"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isCoarse = window.matchMedia("(pointer: coarse)").matches
    if (isCoarse) return // don't render custom cursor on touch devices

    document.body.classList.add("custom-cursor")

    let raf = 0
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let rx = x
    let ry = y

    const onMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
    }

    const loop = () => {
      // lerp ring toward dot
      rx += (x - rx) * 0.15
      ry += (y - ry) * 0.15

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px)`
      }
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener("mousemove", onMove)
    raf = requestAnimationFrame(loop)

    return () => {
      document.body.classList.remove("custom-cursor")
      window.removeEventListener("mousemove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="cursor-container" aria-hidden>
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef} className="cursor-dot" />
    </div>
  )
}

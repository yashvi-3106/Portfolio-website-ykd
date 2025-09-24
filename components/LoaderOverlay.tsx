"use client"

import { useEffect, useState } from "react"

export default function LoaderOverlay({ show }: { show: boolean }) {
  const [visible, setVisible] = useState(show)

  useEffect(() => {
    if (show) {
      setVisible(true)
    } else {
      // fade out before unmounting
      const t = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(t)
    }
  }, [show])

  if (!visible) return null

  return (
    <div
      aria-hidden
      className={`fixed inset-0 z-[1000] flex items-center justify-center bg-background/90 backdrop-blur-sm transition-opacity duration-300 pointer-events-none ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Unique loader: rotating dashed ring + flowing timeline dots */}
      <div className="relative">
        {/* Rotating dashed ring */}
        <div className="loader-ring" />

        {/* Center glyph */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="loader-glyph">YD</div>
        </div>

        {/* Flowing timeline dots under ring */}
        <div className="loader-timeline">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  )
}

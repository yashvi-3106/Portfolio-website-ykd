"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import LoaderOverlay from "@/components/LoaderOverlay"
import CustomCursor from "@/components/CustomCursor"

export default function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showLoader, setShowLoader] = useState(true)

  // Initial loader
  useEffect(() => {
    const t = setTimeout(() => setShowLoader(false), 1000) // show for 1s on initial mount
    return () => clearTimeout(t)
  }, [])

  // Route change micro-loader
  useEffect(() => {
    // Show a short loader when path changes
    setShowLoader(true)
    const t = setTimeout(() => setShowLoader(false), 500)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <>
      <LoaderOverlay show={showLoader} />
      <CustomCursor />
      {children}
    </>
  )
}

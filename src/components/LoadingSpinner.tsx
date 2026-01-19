'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface LoadingProps {
  fullScreen?: boolean
}

export function LoadingSpinner({ fullScreen = false }: LoadingProps) {
  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? 'fixed inset-0 bg-white/80 backdrop-blur-sm' : 'h-full'
      }`}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
    </div>
  )
}

export function useLoadingDelay(delay = 500) {
  const [showLoading, setShowLoading] = React.useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return showLoading
}

'use client'

import { Suspense } from 'react'
import Spline from '@splinetool/react-spline'

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: (spline: any) => void
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <span className="loader"></span>
        </div>
      }
    >
      <Spline scene={scene} className={className} onLoad={onLoad} />
    </Suspense>
  )
}


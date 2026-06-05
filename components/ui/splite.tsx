"use client";

import { Suspense, lazy } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

/** Lazy-loaded Spline 3D scene. Fetches the scene at runtime from spline.design. */
export function SplineScene({ scene, className }: SplineSceneProps) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-gold/40 border-t-gold" />
        </div>
      }
    >
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}

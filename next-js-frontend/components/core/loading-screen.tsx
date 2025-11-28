"use client"

import { CampusFlowLoader } from "./campus-flow-loader"

export function LoadingScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <CampusFlowLoader />
    </div>
  )
}

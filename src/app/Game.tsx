'use client'

import { GameProvider } from "@/contexts";
import { GameRouter } from "./GameRouter";

export function Game() {
  return(
    <GameProvider>
      <GameRouter />
    </GameProvider>
  )
}
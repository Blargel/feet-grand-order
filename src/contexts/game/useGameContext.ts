import { useContext } from "react";
import { GameContextValue } from "./types";
import { GameContext } from "./GameContext";

export function useGameContext(): GameContextValue {
  const value = useContext(GameContext);
  if (value == null) {
    throw new Error("useGameContext must be used in a GameProvider");
  }
  return value;
}

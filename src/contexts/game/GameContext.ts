import { createContext } from "react";
import { GameContextValue } from "./types";

export const GameContext = createContext<GameContextValue | undefined>(undefined)
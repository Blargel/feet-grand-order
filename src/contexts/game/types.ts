import type { ServantData } from "@/servants";
import type { Dispatch, SetStateAction } from "react";

export type GameScreenName = "title" | "guess" | "results";

export interface GameContextValue {
  // game state
  screen: GameScreenName;
  servants: ServantData[];
  guesses: string[][];
  index: number;
  score: number;

  // settings
  naOnly: boolean;
  setNaOnly: Dispatch<SetStateAction<boolean>>;

  // functions
  goToScreen: (screen: GameScreenName) => void;
  startGame: (amount: number) => void;
  skipServant: () => void;
  guessServant: (servant: string) => void;
}

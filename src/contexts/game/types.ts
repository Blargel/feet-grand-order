import type { Servant } from "@/gameData";
import type { Dispatch, SetStateAction } from "react";

export type GameScreenName = "title" | "guess" | "results";

export interface Guess {
  servantId: number;
  servantName: string;
}

export interface GameContextValue {
  // game state
  allServants: Servant[];
  screen: GameScreenName;
  servants: Servant[];
  guesses: Guess[][];
  index: number;
  score: number;

  // settings
  naOnly: boolean;
  setNaOnly: Dispatch<SetStateAction<boolean>>;

  // functions
  goToScreen: (screen: GameScreenName) => void;
  startGame: (amount: number) => void;
  skipServant: () => void;
  guessServant: (servantId: number) => void;
}

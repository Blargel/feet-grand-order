"use client";

import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { GameContext } from "./GameContext";
import type { GameContextValue, Guess } from "./types";
import { NiceClass, Servant, getRandomServants } from "@/gameData";

export interface GameProviderProps {
  allServants: Servant[];
  classes: NiceClass[];
}

export function GameProvider({
  allServants,
  classes,
  children,
}: PropsWithChildren<GameProviderProps>) {
  const [screen, setScreen] = useState<GameContextValue["screen"]>("title");
  const [servants, setServants] = useState<GameContextValue["servants"]>([]);
  const [guesses, setGuesses] = useState<GameContextValue["guesses"]>([]);
  const [index, setIndex] = useState<GameContextValue["index"]>(0);
  const [score, setScore] = useState<GameContextValue["score"]>(0);

  const [naOnly, setNaOnly] = useState<GameContextValue["naOnly"]>(false);

  const goToScreen: GameContextValue["goToScreen"] = useCallback(
    (newScreen) => {
      setScreen(newScreen);
    },
    [],
  );

  const startGame: GameContextValue["startGame"] = useCallback(
    (amount) => {
      goToScreen("guess");
      setServants(getRandomServants(allServants, amount, naOnly));
      setGuesses(new Array(amount).fill([]));
      setIndex(0);
      setScore(0);
    },
    [allServants, goToScreen, naOnly],
  );

  const skipServant: GameContextValue["skipServant"] = useCallback(() => {
    if (index === servants.length - 1) {
      goToScreen("results");
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  }, [goToScreen, index, servants.length]);

  const guessServant: GameContextValue["guessServant"] = useCallback(
    (servantId) => {
      const servant = allServants.find((servant) => servant.id === servantId);
      if (servant == null) {
        return;
      }

      setGuesses((prevGuesses) => {
        const newGuesses = [...prevGuesses];
        const newGuess: Guess = {
          servantId: servant.id,
          servantName: servant.servantName,
        };
        newGuesses[index] = [...newGuesses[index], newGuess];
        if (servantId === servants[index]?.id) {
          setScore((prevScore) => prevScore + 5);
          skipServant();
        } else {
          setScore((prevScore) => prevScore - 1);
        }
        return newGuesses;
      });
    },
    [allServants, index, servants, skipServant],
  );

  const value: GameContextValue = useMemo(
    () => ({
      allServants: allServants,
      classes,
      screen,
      servants,
      guesses,
      index,
      score,
      naOnly,
      setNaOnly,
      goToScreen,
      startGame,
      skipServant,
      guessServant,
    }),
    [
      allServants,
      classes,
      screen,
      servants,
      guesses,
      index,
      score,
      naOnly,
      setNaOnly,
      goToScreen,
      startGame,
      skipServant,
      guessServant,
    ],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

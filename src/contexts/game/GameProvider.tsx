import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import { GameContext } from "./GameContext";
import { GameContextValue } from "./types";
import { getRandomServants } from "@/servants";

export function GameProvider(props: PropsWithChildren) {
  const [screen, setScreen] = useState<GameContextValue['screen']>('title')
  const [servants, setServants] = useState<GameContextValue['servants']>([])
  const [guesses, setGuesses] = useState<GameContextValue['guesses']>([])
  const [index, setIndex] = useState<GameContextValue['index']>(0)
  const [score, setScore] = useState<GameContextValue['score']>(0)

  const [naOnly, setNaOnly] = useState<GameContextValue['naOnly']>(false)

  const goToScreen: GameContextValue['goToScreen'] = useCallback((newScreen) => {
    setScreen(newScreen)
  }, [])

  const startGame: GameContextValue['startGame'] = useCallback((
    amount,
  ) => {
    goToScreen('guess')
    setServants(getRandomServants(amount, naOnly))
    setGuesses((new Array(amount)).fill([]))
    setIndex(0)
    setScore(0)
  }, [goToScreen, naOnly])

  const skipServant: GameContextValue['skipServant'] = useCallback(() => {
    if (index === servants.length - 1) {
      goToScreen('results')
    } else {
      setIndex(prevIndex => prevIndex + 1)
    }
  }, [goToScreen, index, servants.length])

  const guessServant: GameContextValue['guessServant'] = useCallback(
    (servant: string) => {
      setGuesses((prevGuesses) => {
        const newGuesses = [...prevGuesses]
        newGuesses[index] = [...newGuesses[index], servant]
        if (servant === servants[index]?.name) {
          setScore(prevScore => prevScore + 5)
          skipServant()
        } else {
          setScore(prevScore => prevScore - 1)
        }
        return newGuesses
      })
    }, [index, servants, skipServant]
  )

  const value: GameContextValue = useMemo(() => ({
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
  }),[
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
    guessServant
  ])

  return (
    <GameContext.Provider value={value} {...props} />
  )
}
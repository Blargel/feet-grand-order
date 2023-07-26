import { useGameContext } from "@/contexts";
import { ResultsScreen, GuessScreen, TitleScreen } from "@/screens";

export function GameRouter() {
  const { screen } = useGameContext();

  if (screen === "title") {
    return <TitleScreen />;
  } else if (screen === "guess") {
    return <GuessScreen />;
  } else if (screen === "results") {
    return <ResultsScreen />;
  } else {
    return null;
  }
}

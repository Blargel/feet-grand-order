import { GameProvider } from "@/contexts";
import { GameRouter } from "./GameRouter";
import { compileGameData } from "@/gameData";

export async function Game() {
  const [allServants, classes] = await compileGameData();

  return (
    <GameProvider allServants={allServants} classes={classes}>
      <GameRouter />
    </GameProvider>
  );
}

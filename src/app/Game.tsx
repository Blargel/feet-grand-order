import { GameProvider } from "@/contexts";
import { GameRouter } from "./GameRouter";
import { compileServantData } from "@/gameData";

export async function Game() {
  const allServants = await compileServantData();

  return (
    <GameProvider allServants={allServants}>
      <GameRouter />
    </GameProvider>
  );
}

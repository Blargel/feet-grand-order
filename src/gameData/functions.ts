import {
  fetchHeelPortraits,
  fetchServantsJP,
  fetchServantsNA,
} from "./atlasAcademy";
import type { ServantBasic } from "@atlasacademy/api-connector/dist/Schema/Servant";
import type { Servant } from "./types";
import { ALIASES } from "./aliases";

export async function compileServantData(): Promise<Servant[]> {
  const [heelPortraits, naServants, jpServants] = await Promise.all([
    fetchHeelPortraits(),
    fetchServantsNA(),
    fetchServantsJP(),
  ]);

  // Remove the extra summer valks
  const filteredHeelPortraits = heelPortraits.filter(
    (portrait) => portrait.id !== 604400 && portrait.id !== 604500,
  );

  return heelPortraits.map((portrait) => {
    let servant: ServantBasic | undefined = naServants.find(
      (servant) => servant.id === portrait.id,
    );
    let inNa: boolean = true;
    if (servant == null) {
      servant = jpServants.find((servant) => servant.id === portrait.id);
      inNa = false;
    }

    if (servant == null) {
      throw new Error(`Cannot find servant with id of ${portrait.id}`);
    }

    const servantName =
      ALIASES[portrait.id]?.nameOverride ??
      servant.overwriteName ??
      servant.name;

    const aliases = ALIASES[portrait.id]?.aliases ?? [];

    return {
      id: portrait.id,
      imageUrl: portrait.image,
      servantName,
      classId: servant.classId,
      aliases,
      inNa,
    };
  });
}

export function getRandomServants(
  servants: Servant[],
  amount: number,
  naOnly: boolean,
): Servant[] {
  let filteredServants = [...servants];
  if (naOnly) {
    filteredServants = servants.filter((servant) => servant.inNa);
  }
  return shuffle(filteredServants).slice(0, amount);
}

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

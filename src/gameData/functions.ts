import {
  NiceClass,
  fetchClasses,
  fetchHeelPortraits,
  fetchServantsJP,
  fetchServantsNA,
} from "./atlasAcademy";
import type { ServantBasic } from "@atlasacademy/api-connector/dist/Schema/Servant";
import type { Servant } from "./types";
import { ALIASES } from "./aliases";

export async function compileGameData(): Promise<[Servant[], NiceClass[]]> {
  const [heelPortraits, naServants, jpServants, classes] = await Promise.all([
    fetchHeelPortraits(),
    fetchServantsNA(),
    fetchServantsJP(),
    fetchClasses(),
  ]);

  // Remove the extra summer valks
  const filteredHeelPortraits = heelPortraits.filter(
    (portrait) => portrait.id !== 604400 && portrait.id !== 604500,
  );

  const servantData: Servant[] = [];
  for (const portrait of filteredHeelPortraits) {
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

    const nameConflict = servantData.find(
      (existing) => existing.servantName === servantName,
    );
    if (nameConflict != null) {
      console.warn(
        `portraidId ${portrait.id} is using the name ${servantName} but that name is also being used by portraitId ${nameConflict.id}`,
      );
    }

    servantData.push({
      id: portrait.id,
      imageUrl: portrait.image,
      servantName,
      classId: servant.classId,
      aliases,
      inNa,
    });
  }

  return [servantData, classes];
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

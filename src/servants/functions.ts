import { SERVANTS } from "./data";
import { ServantData } from "./types";

export function getRandomServants(amount: number, naOnly: boolean): ServantData[] {
  let servants = [...SERVANTS]
  if (naOnly) {
    servants = servants.filter((servant) => servant.inNa)
  }
  return shuffle(servants).slice(0, amount)
}

function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
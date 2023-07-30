import type { Event } from "@atlasacademy/api-connector/dist/Schema/Event";
import type { ServantBasic } from "@atlasacademy/api-connector/dist/Schema/Servant";

export interface NiceClass {
  id: number;
  className: string;
  iconImageId: number;
}

const HOST = "https://api.atlasacademy.io";
const CACHE_EXPIRY = 60 * 60 * 24;

// Can't use the actual connector if we want next's fetch
async function atlasAcademyFetch<ResponseType>(
  path: string,
): Promise<ResponseType> {
  const url = `${HOST}${path}`;
  const response = await fetch(url, { next: { revalidate: CACHE_EXPIRY } });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return (await response.json()) as ResponseType;
}

export async function fetchHeelPortraits() {
  const { heelPortraits } = await atlasAcademyFetch<Event>(
    "/nice/JP/event/80432",
  );
  return heelPortraits;
}

export async function fetchServantsNA() {
  return await atlasAcademyFetch<ServantBasic[]>(
    "/export/NA/basic_servant.json",
  );
}

export async function fetchServantsJP() {
  return await atlasAcademyFetch<ServantBasic[]>(
    "/export/JP/basic_servant_lang_en.json",
  );
}

export async function fetchClasses() {
  return await atlasAcademyFetch<NiceClass[]>("/export/JP/NiceClass.json");
}

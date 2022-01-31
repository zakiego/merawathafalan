import { AlquranTable } from "~/lib/AyatType";

export function CloneData(data: AlquranTable[]) {
  const clone = JSON.parse(JSON.stringify(data));
  return clone;
}

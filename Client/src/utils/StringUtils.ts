import { Languages } from "../assets/Languages";

export function languageFromId(id: string) {
  return Languages.find((item) => item.code === id)?.name;
}

export function toTileCase(str: string) {
  return str
    .split(" ")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

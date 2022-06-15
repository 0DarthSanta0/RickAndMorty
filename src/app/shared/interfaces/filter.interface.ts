import { Character } from "./character.interface";
import { Episode } from "./episode.interface";

export interface Filter {
  info: {
    count: number | null,
    pages: number | null,
    next: string | null,
    prev: string | null,
  },
  results: [],
}

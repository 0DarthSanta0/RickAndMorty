import { Character } from "./character.interface";
import { Location } from "./location.interface";
import { Episode } from "./episode.interface";

export interface ResultValue {
  essence: Character | Location | Episode | null ;
  id: number | null;
  type: string | null;
}

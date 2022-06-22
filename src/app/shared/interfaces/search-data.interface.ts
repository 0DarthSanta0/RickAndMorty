import { Character } from "./character.interface";
import { Location} from "./location.interface";
import { Episode } from "./episode.interface";

export interface SearchData {
  characters: Character[],
  locations: Location[],
  episodes: Episode[],
}

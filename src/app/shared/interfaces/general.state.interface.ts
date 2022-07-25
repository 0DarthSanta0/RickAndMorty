import { Character } from "./character.interface";
import { Episode } from "./episode.interface";
import { Location} from "./location.interface";

export interface GeneralState {
  characters: Character[],
  locations: Location[],
  episodes: Episode[],
  carouselCharacters: Character[],
  essenceForInfo: Character | Location | Episode | null,
}

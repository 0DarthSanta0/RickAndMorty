import { Character } from "./character.interface";
import { Episode } from "./episode.interface";
import { Location} from "./location.interface";

export interface GeneralState {
  characters: Character[],
  locations: Location[],
  episodes: Episode[],
  carouselCharacters: Character[],
  infoCharacter: Character | undefined,
  infoLocation: Location | undefined,
  infoEpisode: Episode | undefined,
}

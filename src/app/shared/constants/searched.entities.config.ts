import { SearchedEntities } from "../enums/searched.entities";

export const SEARCHED_ENTITIES_CONFIG = {
  [SearchedEntities.CHARACTERS] : { label: 'Characters', value: 'ch' },
  [SearchedEntities.LOCATIONS] : { label: 'Location', value: 'loc' },
  [SearchedEntities.EPISODES] : { label: 'Episodes', value: 'ep' },
}

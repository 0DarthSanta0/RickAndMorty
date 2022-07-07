import { BaseEssence } from "./base.essence";

export interface Episode extends BaseEssence{
  air_date: string | null;
  episode: string | null;
  characters: string[] | null;
}

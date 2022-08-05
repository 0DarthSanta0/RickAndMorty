import { BaseEssence } from "./base.essence.interface";

export interface Episode extends BaseEssence{
  air_date: string | null;
  episode: string | null;
  characters: string[] | null;
}

import { BaseEssence } from "./base.essence.interface";

export interface Character extends BaseEssence{
  status: string | null;
  species: string | null;
  type: string | null;
  gender: string | null;
  origin: object | null;
  location: object | null;
  image: string | null;
  episode: string[] | null;
}

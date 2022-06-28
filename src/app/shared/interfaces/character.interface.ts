import { BaseEntity } from "./base.entity";

export interface Character extends BaseEntity{
  status: string | null;
  species: string | null;
  type: string | null;
  gender: string | null;
  origin: object | null;
  location: object | null;
  image: string | null;
  episode: string[] | null;
}

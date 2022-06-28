import { BaseEntity } from "./base.entity";

export interface Episode extends BaseEntity{
  air_date: string | null;
  episode: string | null;
  characters: string[] | null;
}

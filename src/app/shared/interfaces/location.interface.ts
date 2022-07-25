import { BaseEssence } from "./base.essence.interface";

export interface Location extends BaseEssence{
  type: string | null;
  dimension: string | null;
  residents: string[] | null;
}

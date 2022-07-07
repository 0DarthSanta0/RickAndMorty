import { BaseEssence } from "./base.essence";

export interface Location extends BaseEssence{
  type: string | null;
  dimension: string | null;
  residents: string[] | null;
}

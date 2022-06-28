import { BaseEntity } from "./base.entity";

export interface Location extends BaseEntity{
  type: string | null;
  dimension: string | null;
  residents: string[] | null;
}

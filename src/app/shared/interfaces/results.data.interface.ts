import { ResultsItem } from "./results.item.interface";

export interface ResultsData {
  label: string | null;
  value: string | null;
  items: ResultsItem[];
}

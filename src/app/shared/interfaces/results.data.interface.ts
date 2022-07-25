import { ResultsItem } from "./results.item";

export interface ResultsData {
  label: string | null;
  value: string | null;
  items: ResultsItem[];
}

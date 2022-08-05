import { MODIFIED_DATA_CONFIG, TIME_LIMIT } from '../constants/modified-data.config';

export function clearDataInitializer() {
  const lastDate: number | null = JSON.parse(localStorage.getItem(MODIFIED_DATA_CONFIG) || '{}');
  if (lastDate && +new Date() - lastDate > TIME_LIMIT) {
    localStorage.clear();
  }
  return () => {};
}

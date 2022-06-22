export interface Filter<T> {
  info: {
    count: number | null,
    pages: number | null,
    next: string | null,
    prev: string | null,
  },
  results: T[],
}

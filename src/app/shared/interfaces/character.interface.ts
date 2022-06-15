export interface Character {
  id: number | null;
  name: string | null;
  status: string | null;
  species: string | null;
  type: string | null;
  gender: string | null;
  origin: object | null;
  location: object | null;
  image: string | null;
  episode: string[] | null;
  url: string | null;
  created: string | null;
}

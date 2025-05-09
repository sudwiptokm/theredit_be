import { Film } from './film.interface';

export interface Character {
  id: string;
  name: string;
  homeworld: string;
  species: string[];
  films: Film[];
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  vehicles: string[];
  starships: string[];
}

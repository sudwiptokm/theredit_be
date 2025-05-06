export interface SwapiPeopleResponse {
  results: SwapiResource[];
}

export interface SwapiResource {
  uid: string;
  name: string;
  properties?: {
    name: string;
    homeworld: string;
    species: string[];
    films: string[];
  };
}

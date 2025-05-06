import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { Character } from './interfaces/character.interface';
import { SwapiResource } from './interfaces/swapi.interface';

@Injectable()
export class CharactersService {
  private readonly baseUrl: string;
  private readonly logger = new Logger(CharactersService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>(
      'SWAPI_URL',
      'https://swapi.info/api',
    );
  }

  async findAll(page: number = 1): Promise<Character[]> {
    const response = await firstValueFrom(
      this.httpService.get<SwapiResource[]>(
        `${this.baseUrl}/people?page=${page}`,
      ),
    );

    const characters = await Promise.all(
      response.data.map(async (char) => this.enrichCharacter(char)),
    );

    return characters;
  }

  async findOne(id: string): Promise<any> {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.baseUrl}/people/${id}`),
      );
      const character = await this.enrichCharacter(response.data);

      return character;
    } catch (error) {
      this.logger.error(`Error fetching character with ID ${id}:`, error);
      return null;
    }
  }

  async search(name: string): Promise<Character[]> {
    const response = await firstValueFrom(
      this.httpService.get<SwapiResource[]>(`${this.baseUrl}/people`),
    );

    const filtered = response.data.filter((char) =>
      char.name.toLowerCase().includes(name.toLowerCase()),
    );

    const characters = await Promise.all(
      filtered.map(async (char) => this.enrichCharacter(char)),
    );

    return characters;
  }

  private async enrichCharacter(char: any): Promise<Character> {
    return {
      id: char.uid,
      name: char.name,
      homeworld: await this.fetchResource(char?.homeworld).then(
        (res) => res?.name || 'N/A',
      ),
      species: await Promise.all(
        char?.species
          ? char.species.map((url) =>
              this.fetchResource(url).then((res) => res?.name || 'N/A'),
            )
          : [],
      ),
      films: await Promise.all(
        char?.films
          ? char.films.map((url) =>
              this.fetchResource(url).then((res) => res?.title || 'N/A'),
            )
          : [],
      ),
    };
  }

  private async fetchResource(url: string | null): Promise<any> {
    if (!url) return null;
    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const resource = response.data;
      return resource;
    } catch (error) {
      console.log({ error });
      return null;
    }
  }
}

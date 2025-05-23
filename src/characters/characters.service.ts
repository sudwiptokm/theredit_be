import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
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
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {
    this.baseUrl = this.configService.get<string>(
      'SWAPI_URL',
      'https://swapi.py4e.com/api/',
    );
  }

  async findAll(page: number = 1): Promise<{
    characters: Character[];
    total: number;
    next: string;
    previous: string;
  }> {
    const response = await firstValueFrom(
      this.httpService.get<{
        results: SwapiResource[];
        count: number;
        next: string;
        previous: string;
      }>(`${this.baseUrl}/people?page=${page}`),
    );

    const characters = await Promise.all(
      response.data.results.map(async (char) => this.enrichCharacter(char)),
    );

    return {
      characters,
      total: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    };
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

  async search(name: string): Promise<{
    characters: Character[];
    total: number;
    next: string;
    previous: string;
  }> {
    const response = await firstValueFrom(
      this.httpService.get<{
        results: SwapiResource[];
        count: number;
        next: string;
        previous: string;
      }>(`${this.baseUrl}/people/?search=${encodeURIComponent(name)}`),
    );

    const characters = await Promise.all(
      response.data.results.map(async (char) => this.enrichCharacter(char)),
    );

    return {
      characters,
      total: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    };
  }

  async listCharacters(
    options: { search?: string; page?: number } = {},
  ): Promise<{
    characters: Character[];
    total: number;
    next: string;
    previous: string;
  }> {
    const { search, page = 1 } = options;

    // Build the query parameters
    const params = new URLSearchParams();
    if (page) params.append('page', page.toString());
    if (search) params.append('search', search);

    const url = `${this.baseUrl}/people/?${params.toString()}`;

    const response = await firstValueFrom(
      this.httpService.get<{
        results: SwapiResource[];
        count: number;
        next: string;
        previous: string;
      }>(url),
    );

    const characters = await Promise.all(
      response.data.results.map(async (char) => this.enrichCharacter(char)),
    );

    return {
      characters,
      total: response.data.count,
      next: response.data.next,
      previous: response.data.previous,
    };
  }

  private async enrichCharacter(char: any): Promise<Character> {
    // Collect all URLs that need to be fetched
    const urlsToFetch = [
      char?.homeworld,
      ...(char?.species || []),
      ...(char?.films || []),
      ...(char?.vehicles || []),
      ...(char?.starships || []),
    ].filter(Boolean);

    // Fetch all resources in parallel
    const resourcePromises = urlsToFetch.map((url) =>
      this.fetchResource(url as string),
    );
    const resources = await Promise.all(resourcePromises);

    // Create a map of URL to resource for easy lookup
    const resourceMap = new Map();
    urlsToFetch.forEach((url, index) => {
      resourceMap.set(url, resources[index]);
    });

    // Now construct the character with the fetched resources
    return {
      id: char.url.split('/').slice(-2, -1)[0],
      name: char.name,
      homeworld: resourceMap.get(char?.homeworld)?.name || 'N/A',
      species: (char?.species || []).map(
        (url) => resourceMap.get(url)?.name || 'N/A',
      ),
      films: (char?.films || []).map((url) => {
        const film = resourceMap.get(url);
        return {
          title: film?.title || 'N/A',
          episode_id: film?.episode_id || 0,
          release_date: film?.release_date || 'N/A',
        };
      }),
      height: char.height,
      mass: char.mass,
      hair_color: char.hair_color,
      skin_color: char.skin_color,
      eye_color: char.eye_color,
      birth_year: char.birth_year,
      gender: char.gender,
      vehicles: (char?.vehicles || []).map(
        (url) => resourceMap.get(url)?.name || 'N/A',
      ),
      starships: (char?.starships || []).map(
        (url) => resourceMap.get(url)?.name || 'N/A',
      ),
    };
  }

  private async fetchResource(url: string | null): Promise<any> {
    if (!url) return null;

    // Generate a cache key from the URL
    const cacheKey = `resource_${url}`;

    // Try to get from cache
    const cachedResource = await this.cacheManager.get(cacheKey);
    if (cachedResource) {
      return cachedResource;
    }

    try {
      const response = await firstValueFrom(this.httpService.get(url));
      const resource = response.data;

      // Store in cache with TTL (e.g., 1 hour = 3600 seconds)
      await this.cacheManager.set(cacheKey, resource, 3600);

      return resource;
    } catch (error) {
      this.logger.error(`Error fetching resource from ${url}:`, error);
      return null;
    }
  }
}

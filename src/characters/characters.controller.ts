import { CacheInterceptor } from '@nestjs/cache-manager';
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CharactersService } from './characters.service';
import { SearchCharactersDto } from './dto/search-characters.dto';
import { Character } from './interfaces/character.interface';

@ApiTags('characters')
@Controller('characters')
@UseInterceptors(CacheInterceptor)
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Get()
  @ApiOperation({ summary: 'Get a list of characters with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'List of characters' })
  async findAll(@Query('page') page: number = 1): Promise<Character[]> {
    return await this.charactersService.findAll(page);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search characters by name' })
  @ApiQuery({ name: 'name', required: true })
  @ApiResponse({ status: 200, description: 'List of matching characters' })
  async search(@Query() query: SearchCharactersDto): Promise<Character[]> {
    return this.charactersService.search(query.name);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a character by ID' })
  @ApiResponse({ status: 200, description: 'Character details' })
  @ApiResponse({ status: 404, description: 'Character not found' })
  async findOne(@Param('id') id: string): Promise<Character> {
    const character = await this.charactersService.findOne(id);
    if (!character) {
      throw new NotFoundException(`Character with ID ${id} not found`);
    }
    return character;
  }
}

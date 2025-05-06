import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SearchCharactersDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Name to search for', example: 'Luke' })
  name: string;
}

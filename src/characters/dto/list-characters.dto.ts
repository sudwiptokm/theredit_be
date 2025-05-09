import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class ListCharactersDto {
  @IsString()
  @IsOptional()
  @ApiProperty({
    description: 'Name to search for (optional)',
    example: 'Luke',
    required: false,
  })
  search?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({
    description: 'Page number',
    example: 1,
    default: 1,
    required: false,
  })
  page?: number = 1;
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class GetUsersParamDto {
  @ApiPropertyOptional({
    description: 'Get User with a specific id',
    example: 1234,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  id?: number;
}

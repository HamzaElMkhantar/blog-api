// import { Transform, Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  //   @Transform(({ value }) => parseInt(value)) // Transform the input value (string) to an integer to ensure it's a number
  page?: number = 10;

  @IsOptional()
  @IsPositive()
  //   @Type(() => Number) // Use Type() to automatically convert the string value to a number during transformation
  limit?: number = 1;
}

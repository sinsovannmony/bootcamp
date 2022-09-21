import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class UpdateCategoryDto {
  @ValidateIf((value) => value.name !== undefined && value.name !== null)
  @IsString()
  name: string;
  @ValidateIf(
    (value) => value.description !== undefined && value.description !== null,
  )
  @IsString()
  description: string;
}

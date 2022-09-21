import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class UpdateFoodDto {
  //name
  @ValidateIf((value) => value.name !== undefined && value.name !== null)
  @IsString()
  name: string;

  //description
  @ValidateIf(
    (value) => value.description !== undefined && value.description !== null,
  )
  @IsString()
  description: string;

  //price
  @ValidateIf((value) => value.price !== undefined && value.price !== null)
  @IsNumber()
  price: number;

  //image
  @ValidateIf((value) => value.image !== undefined && value.image !== null)
  @IsString()
  image: string;

  //category
  @ValidateIf(
    (value) => value.category !== undefined && value.category !== null,
  )
  @IsNumber()
  category: number;
}

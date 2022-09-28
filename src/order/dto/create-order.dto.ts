import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateOrderDto {
  @IsNumber()
  @IsNotEmpty()
  totalPrice: number;

  @IsNumber()
  @IsNotEmpty()
  food: number;

  @IsNotEmpty()
  @IsNumber()
  lat: number;

  @IsNotEmpty()
  @IsNumber()
  long: number;
}

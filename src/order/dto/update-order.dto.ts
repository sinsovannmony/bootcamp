import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsNumber, ValidateIf } from 'class-validator';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  //totalPrice
  @ValidateIf(
    (value) => value.totalPrice !== undefined && value.totalPrice !== null,
  )
  @IsNumber()
  totalPrice: number;

  //food
  @ValidateIf((value) => value.food !== undefined && value.food !== null)
  @IsNumber()
  food: number;

  //user
  @ValidateIf((value) => value.user !== undefined && value.user !== null)
  @IsNumber()
  user: number;
}

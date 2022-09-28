import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from 'src/menu/entities/food.entity';
import { Order } from './entities/order.entity';
import { checkLocation } from 'src/validation/check.location';

@Module({
  imports: [TypeOrmModule.forFeature([User, Food, Order]), checkLocation],
  controllers: [OrderController],
  providers: [OrderService, checkLocation],
})
export class OrderModule {}

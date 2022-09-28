import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { Food } from 'src/menu/entities/food.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';
import { checkLocation } from 'src/validation/check.location';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Food) private foodRepo: Repository<Food>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    private checkLocation: checkLocation,
  ) {}
  async createOrder(user: any, createOrderDto: CreateOrderDto) {
    try {
      const result = this.checkLocation.check(
        createOrderDto.lat,
        createOrderDto.long,
      );
      if (!result)
        return {
          statusCode: 404,
          msg: "User didn't in the shop area",
          data: null,
        };
      const { totalPrice, food } = createOrderDto;
      const selectedFood = await this.foodRepo.findOne({
        where: { id: food },
      });
      if (!selectedFood)
        return {
          statusCode: 404,
          msg: 'Invalid food selected',
          data: null,
        };
      const selectedUser = await this.userRepo.findOne({
        where: { id: user.id },
      });
      console.log(selectedUser);
      if (!selectedUser)
        return {
          statusCode: 404,
          msg: 'Invalid user selected',
          data: null,
        };
      const newOrder = await this.orderRepo.create({
        totalPrice: totalPrice,
        food: selectedFood,
        user: selectedUser,
      });
      const savedOrder = await this.orderRepo.save(newOrder);
      return {
        statusCode: 201,
        msg: 'Order created successfully',
        data: savedOrder,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }

  async findAllOrder() {
    try {
      const order = await this.orderRepo.find({ relations: ['user', 'food'] });
      return {
        statusCode: 201,
        msg: 'Order retrieved successfully',
        data: order,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }
  async findOrderByUser(userId: string) {
    try {
      const order = await this.orderRepo.find({
        where: {
          user: {
            id: userId,
          },
        },
        relations: ['food'],
      });
      console.log(order);
      return {
        statusCode: 201,
        msg: 'Order retrieved successfully',
        data: order,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }

  async remove(id: number) {
    try {
      const deletedFood = await this.orderRepo.delete({ id });
      return {
        statusCode: 201,
        msg: 'order deleted successfully',
        data: deletedFood,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }

  async checklocation() {
    try {
      const shoplong = 12.4;
      const shopla = 1.25;
      const userlong = 11;
      const userla = 2.25;
      var xDiff = shoplong - userlong;
      var yDiff = shopla - userla;
      const result = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
      return result;
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }
}

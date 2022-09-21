import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Food } from 'src/menu/entities/food.entity';
import { User } from 'src/users/entities/user.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Food) private foodRepo: Repository<Food>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
  ) {}
  async createOrder(user: any, createOrderDto: CreateOrderDto) {
    try {
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
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { User, UserId } from 'src/auth/decorators/user.decorator';
import { JwtAuthGuard } from 'src/auth/passport/guards/jwt-auth.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@User() user: any, @Body() createOrderDto: CreateOrderDto) {
    return this.orderService.createOrder(user, createOrderDto);
  }

  @Get()
  findAll() {
    return this.orderService.findAllOrder();
  }

  @Get('/byUser')
  @UseGuards(JwtAuthGuard)
  findOne(@UserId() user: string) {
    return this.orderService.findOrderByUser(user);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.orderService.remove(id);
  }
}

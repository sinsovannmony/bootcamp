import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MenuService } from './menu.service';

import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/users/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/passport/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/passport/guards/role-auth.guard';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  //category routes
  @Get('category')
  findAllCategories() {
    return this.menuService.findAllCategories();
  }

  @Get('category/:id')
  findOneCategory(@Param('id') id: number) {
    return this.menuService.findOneCategory(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @Post('category')
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.menuService.createCategory(createCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @Patch('category/:id')
  updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.menuService.updateCategory(id, updateCategoryDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @Delete('category/:id')
  deleteCategory(@Param('id') id: number) {
    return this.menuService.deleteCategory(id);
  }

  //food route

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @Get('food')
  findAllFood() {
    console.log('food');
    return this.menuService.findAllFood();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @Get('food/:id')
  findOneFood(@Param('id') id: number) {
    return this.menuService.findOneFood(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @Post('food')
  createFood(@Body() createFoodDto: CreateFoodDto) {
    return this.menuService.createFood(createFoodDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @Patch('food/:id')
  updateFood(@Param('id') id: number, @Body() updateFoodDto: UpdateFoodDto) {
    return this.menuService.updateFood(id, updateFoodDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.SuperAdmin, Role.Admin)
  @Delete('food/:id')
  deleteFood(@Param('id') id: number) {
    return this.menuService.deleteFood(id);
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateFoodDto } from './dto/create-food.dto';

import { UpdateCategoryDto } from './dto/update-category.dto';
import { UpdateFoodDto } from './dto/update-food.dto';

import { Category } from './entities/category.entity';
import { Food } from './entities/food.entity';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Food) private foodRepo: Repository<Food>,
  ) {}
  //categories methods

  //retrieves all categories
  async findAllCategories() {
    try {
      const categories = await this.categoryRepo.find({
        where: { status: true },
        relations: ['foods'],
      });
      return {
        statusCode: 200,
        msg: 'Categories retrieved successfully',
        data: categories,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }

  async findOneCategory(id: number) {
    try {
      const category = await this.categoryRepo.findOne({
        where: { id },
        relations: ['foods'],
      });
      return {
        statusCode: 200,
        msg: 'Categories retrieved successfully',
        data: category,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }

  //create a category
  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const { name, description } = createCategoryDto;
      const newCategory = await this.categoryRepo.create({ name, description });
      const savedCategory = await this.categoryRepo.save(newCategory);
      return {
        statusCode: 201,
        msg: 'Categories retrieved successfully',
        data: savedCategory,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }
  //update a category
  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      console.log(id);
      const updatedCategory = await this.categoryRepo.update(
        { id },
        { ...updateCategoryDto },
      );
      return {
        statusCode: 201,
        msg: 'Categories updated successfully',
        data: updatedCategory,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }

  //delete a category
  async deleteCategory(id: number) {
    try {
      const deletedCategory = await this.categoryRepo.delete({ id });
      return {
        statusCode: 201,
        msg: 'Categories updated successfully',
        data: deletedCategory,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }

  //food methods

  //retrieve all food
  async findAllFood() {
    try {
      const food = await this.foodRepo.find();
      return {
        statusCode: 201,
        msg: 'Food retrieved successfully',
        data: food,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }
  //retrieve one food
  async findOneFood(id: number) {
    try {
      const food = await this.foodRepo.findOne({
        where: { id },
        relations: ['category'],
      });
      return {
        statusCode: 201,
        msg: 'Food retrieved successfully',
        data: food,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }
  //Create Food
  async createFood(createFoodDto: CreateFoodDto) {
    try {
      const { name, description, price, category, image } = createFoodDto;
      const selectedCategory = await this.categoryRepo.findOne({
        where: { id: category },
      });
      if (!selectedCategory)
        return {
          statusCode: 404,
          msg: 'Invalid category selected',
          data: null,
        };
      const newFood = await this.foodRepo.create({
        name,
        description,
        price,
        category: selectedCategory,
        image,
      });
      const savedFood = await this.foodRepo.save(newFood);
      return {
        statusCode: 201,
        msg: 'Food created successfully',
        data: savedFood,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }
  //update food
  async updateFood(id: number, updateFoodDto: UpdateFoodDto) {
    try {
      // if (updateFoodDto.category != undefined) {
      //   const { category, ...updates } = updateFoodDto;
      //   const selectedCategory = await this.categoryRepo.findOne({
      //     where: { id: category },
      //   });
      //   const updatedFood = await this.categoryRepo.update({id},{...updates,category:selectedCategory})
      // }
      const { category, ...updates } = updateFoodDto;
      const updatedFood = await this.categoryRepo.update(
        { id },
        { ...updates },
      );
      return {
        statusCode: 201,
        msg: 'Food updated successfully',
        data: updatedFood,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }
  async deleteFood(id: number) {
    try {
      const deletedFood = await this.foodRepo.delete({ id });
      return {
        statusCode: 201,
        msg: 'Food deleted successfully',
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

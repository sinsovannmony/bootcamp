import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Role } from './enums/role.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  //create a user
  async create(createUserDto: CreateUserDto) {
    try {
      const { email, password, fullname, role } = createUserDto;
      const userExists = await this.userRepo.findOne({ where: { email } });
      if (userExists)
        return {
          statusCode: 409,
          msg: 'This Email is already taken',
          data: null,
        };
      const newUser = await this.userRepo.create({
        email,
        fullname,
        password,
        role,
      });
      const savedUser = await this.userRepo.save(newUser);
      return {
        statusCode: 201,
        msg: 'Phone saved successfully',
        data: savedUser,
      };
    } catch (error) {
      console.log(error.message);
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }

  //find all users
  async findAll() {
    try {
      const users = await this.userRepo.find({
        where: { role: Not(Role.SuperAdmin) },
      });
      return {
        statusCode: 201,
        msg: 'Users retrieved successfully',
        data: users,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }

  //find one user
  async findOne(email: string) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      return user;
    } catch (error) {
      return null;
    }
  }

  //find auth user
  async findAuthUser(email: string) {
    try {
      const user = await this.userRepo.findOne({ where: { email } });
      return user;
    } catch (error) {
      return null;
    }
  }

  //update a user
  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.userRepo.update(
        { id, role: Not(Role.SuperAdmin) },
        {
          ...updateUserDto,
        },
      );
      return {
        statusCode: 201,
        msg: 'Users updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      return {
        statusCode: 502,
        msg: error.message,
        data: null,
      };
    }
  }

  async remove(id: string) {
    try {
      const removedUser = await this.userRepo.delete({
        id,
        role: Not(Role.SuperAdmin),
      });
      return {
        statusCode: 201,
        msg: 'Users removed successfully',
        data: removedUser,
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

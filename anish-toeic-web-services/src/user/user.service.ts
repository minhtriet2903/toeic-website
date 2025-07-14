import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashPassword } from 'src/auth/helpers';
import { User, UserDocument } from 'src/schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await hashPassword(user.password ?? 'abcD@1234');
      const newUser = new this.userModel({ ...user, password: hashedPassword });

      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('Email already exists');
      }
      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userModel
      .find({ role: { $ne: 'admin' } })
      .select('email name role status createdAt')
      .exec();
  }

  async findOne(id: string): Promise<User> {
    return await this.userModel
      .findById(id)
      .select('email name role status createdAt')
      .exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel
      .findOne({ email })
      .select('email name role')
      .exec();
  }

  async findByEmailForAuthentication(email: string): Promise<User> {
    return await this.userModel
      .findOne({ email })
      .select('email name role password')
      .exec();
  }

  async update(id: string, user: User): Promise<User> {
    const hashedPassword = await hashPassword(user.password);
    return await this.userModel
      .findByIdAndUpdate(
        id,
        { ...user, password: hashedPassword },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<User> {
    return await this.userModel.findByIdAndDelete(id).exec();
  }
}

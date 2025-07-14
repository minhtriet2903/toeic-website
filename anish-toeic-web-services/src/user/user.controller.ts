import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { EnrollmentService } from 'src/enrollment/enrollment.service';
import { ResultService } from 'src/result/result.service';
import { User } from 'src/schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly enrollmentService: EnrollmentService,
    private readonly resultService: ResultService,
  ) {}

  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.userService.create(user);
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  @Public()
  @Get(':id/courses')
  async getCoursesForUser(@Param('id') id: string) {
    return this.enrollmentService.findByUserId(id);
  }

  @Public()
  @Get(':id/results')
  async getResultsByUser(@Param('id') id: string) {
    return this.resultService.getResultsByUser(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() user: User,
  ): Promise<User | null> {
    return this.userService.update(id, user);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<User | null> {
    return this.userService.delete(id);
  }
}

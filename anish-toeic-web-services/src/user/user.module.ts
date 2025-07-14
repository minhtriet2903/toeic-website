import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnrollmentService } from 'src/enrollment/enrollment.service';
import { ResultService } from 'src/result/result.service';
import { EnrollmentSchema } from 'src/schema/enrollment.schema';
import { ResultSchema } from 'src/schema/result.schema';
import { UserSchema } from 'src/schema/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Enrollment', schema: EnrollmentSchema },
      { name: 'Result', schema: ResultSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, EnrollmentService, ResultService],
})
export class UserModule {}

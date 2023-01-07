import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtModule } from '@nestjs/jwt';
import { User } from "src/database/entities";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY || 'abcxyz',
      signOptions: { expiresIn: 5 * 60 }, // 5 minutes
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [PassportModule],
})
export class UserModule {}
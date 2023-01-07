import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as argon2 from 'argon2';

import { User } from "src/database/entities";
import { LoginDto } from "./dto/login.dto";
import { Causes } from "src/config/exception/causes";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class UserService {
  constructor(
    private jwtService: JwtService,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async register(data: RegisterDto) {
    // check duplicate
    let duplicateUser = await this.findUserByEmail(data.email);
    if (duplicateUser) {
      throw Causes.USER_EXISTED;
    }

    // create user
    let hashPassword = await argon2.hash(data.password);
    let user = new User();
    user.fullName = data.fullName;
    user.email = data.email;
    user.password = hashPassword;
    await this.usersRepository.save(user);

    // generate token
    let access_token = this.jwtService.sign({ id: user.id, email: user.email });
    let expires = process.env.EXPIRE_TIME_INTERVAL || 5 * 60 * 1000; // 5 minutes
    return { access_token, expires };
  }

  async findUserByEmail(email: string) {
    const user = await this.usersRepository.findOneBy({ email });
    return user || null;
  }

  async login(data: LoginDto) {
    // check user existed
    let user = await this.findUserByEmail(data.email);
    if (!user) {
      throw Causes.USER_NOT_FOUND;
    }

    // check password
    let isMatch = await argon2.verify(user.password, data.password);
    if (!isMatch) {
      throw Causes.USER_INVALID;
    }

    // generate tokend
    let access_token: string;
    let expires: number;

    if (data.rememberMe === 'true') {
      access_token = this.jwtService.sign({ id: user.id, email: user.email }, { expiresIn: '30d' });
      expires = Number(process.env.EXPIRE_TIME_INTERVAL) || 30 * 24 * 60 * 60 * 1000; // 30 days
    } else {
      access_token = this.jwtService.sign({ id: user.id, email: user.email });
      expires = Number(process.env.EXPIRE_TIME_INTERVAL) || 5 * 60 * 1000; // 5 minutes
    }

    return { access_token, expires };
  }

  async me(userId: number) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) return null;

    const { password, roleId, ...restOfUser } = user;
    return restOfUser;
  }

  async isValidToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      console.log(err);
      // May be token expired
      return false;
    }
  }
}
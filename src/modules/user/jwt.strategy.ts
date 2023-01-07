import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DataSource  } from 'typeorm';
import { User } from 'src/database/entities';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly dataSource: DataSource,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.SECRET_KEY,
    });
  }

  // function is called when passport finds a valid token (valid signature and expiration dat
  // if the token is valid, it extracts the payload and passes it to the validate function
  // function attaches the user to the request object
  async validate(payload: any) {
    const { id, email } = payload;
    const user = await this.dataSource.getRepository(User).findOneBy({ id, email });
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    return user;
  }
}

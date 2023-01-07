import { Body, Controller, Get, Post, Query, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { UserService } from "./user.service";

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post('/register')
  @ApiOperation({
    summary: 'Register',
    description: 'Create a new user',
  })
  async register(@Body() data: RegisterDto) {
    return this.userService.register(data);
  }

  @Post('/login')
  @ApiOperation({
    summary: 'Login',
    description: 'Login',
  })
  async login(@Body() data: LoginDto) {
    return this.userService.login(data);
  }

  @Get('/me')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Get current user',
    description: 'Get current user',
  })
  async me(@Req() req) {
    return this.userService.me(req.user.id);
  }

  @Post('/logout')
  @UseGuards(AuthGuard())
  @ApiOperation({
    summary: 'Logout',
    description: 'Logout',
  })
  async logout(@Req() req) {
    // TODO: implement remove cache token memory
    return true;
  }
}
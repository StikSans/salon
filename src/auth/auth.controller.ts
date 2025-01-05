import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/cretate-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthService } from './jwt.service';

@Controller('auth')
export class AuthController {
  constructor(private aurhService: AuthService) {}

  @Post('reg')
  async reg(@Body() createUser: CreateUserDto) {
    return await this.aurhService.reg(createUser);
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) loginUser: LoginUserDto) {
    return await this.aurhService.login(loginUser);
  }
}

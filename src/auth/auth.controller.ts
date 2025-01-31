import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserReq } from 'src/types';
import { CreateUserDto } from 'src/user/dto/cretate-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { JwtAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('reg')
  async reg(@Body() createUser: CreateUserDto) {
    return await this.authService.reg(createUser);
  }

  @Post('login')
  async login(@Body(new ValidationPipe()) loginUser: LoginUserDto) {
    return await this.authService.login(loginUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get('check')
  async check(@Req() req: UserReq) {
    return await this.authService.checkToken(req.user.id);
  }
}

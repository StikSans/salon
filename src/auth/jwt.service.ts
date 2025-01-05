import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/cretate-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userSerivce: UserService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async reg(createUser: CreateUserDto) {
    const user = await this.userSerivce.creaete(createUser);
    return {
      access_token: await this.createToken(
        { id: user.id, roleId: user.roleId },
        '15min',
        'JWT_ACCESS_KEY',
      ),
      refresh_token: await this.createToken(
        { id: user.id, roleId: user.roleId },
        '7d',
        'JWT_REFRESH_KEY',
      ),
    };
  }
  async login(loginUser: LoginUserDto) {
    const user = await this.userSerivce.getUserByPhoneAndPassword(
      loginUser.phone,
      loginUser.password,
    );
    return {
      access_token: await this.createToken(
        { id: user.id, roleId: user.roleId },
        '15min',
        'JWT_ACCESS_KEY',
      ),
      refresh_token: await this.createToken(
        { id: user.id, roleId: user.roleId },
        '7d',
        'JWT_REFRESH_KEY',
      ),
    };
  }

  private async createToken(
    payload: { id: number; roleId: number },
    time: '15min' | '7d',
    nameEnv: 'JWT_ACCESS_KEY' | 'JWT_REFRESH_KEY',
  ) {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>(nameEnv),
      expiresIn: time,
    });
  }
}

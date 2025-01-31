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
    return await this.returnToken({ id: user.id, roleId: user.roleId });
  }
  async login(loginUser: LoginUserDto) {
    const user = await this.userSerivce.getUserByPhoneAndPassword(
      loginUser.phone,
      loginUser.password,
    );
    return await this.returnToken({ id: user.id, roleId: user.roleId });
  }

  async checkToken(id: number) {
    return await this.userSerivce.getUser(id);
  }
  private async returnToken(payload: { id: number; roleId: number }) {
    return {
      access_token: await this.createToken(payload, '15min', 'JWT_ACCESS_KEY'),
      refresh_token: await this.createToken(payload, '7d', 'JWT_REFRESH_KEY'),
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

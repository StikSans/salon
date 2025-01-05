import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authHeader = req.headers['authorization'];
      const [bearer, token] = authHeader.split(' ');

      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({
          massage: 'Пользователь не зарегестрирован',
        });
      }

      req.user = this.jwtService.verify(token, {
        secret: this.configService.get<string>('JWT_ACCESS_KEY'),
      });
      return true;
    } catch (e) {
      throw new UnauthorizedException({
        massage: 'Пользователь не зарегестрирован',
      });
    }
  }
}

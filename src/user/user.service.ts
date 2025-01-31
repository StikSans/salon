import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/cretate-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async getUsers() {
    return await this.prismaService.user.findMany({ include: { role: true } });
  }

  async getUser(id: number) {
    return await this.prismaService.user.findUnique({ where: { id } });
  }

  async creaete(createUser: CreateUserDto) {
    const { password, ...userData } = createUser;
    const field = await this.prismaService.user.findFirst({
      where: { phone: createUser.phone },
    });
    if (field) {
      throw new ConflictException('Такой пользователь уже существует');
    }
    const hash = await bcrypt.hash(password, 10);
    const user = await this.prismaService.user.create({
      data: { ...userData, password: hash },
    });
    return user;
  }
  async getUserByPhoneAndPassword(phone: string, password: string) {
    const user = await this.prismaService.user.findFirst({ where: { phone } });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new ConflictException('Неверный пароль');
    }
    return user;
  }

  async update(updateUser: UpdateUserDto, userId: number, isPassword: number) {
    const { password, ...userData } = updateUser;
    const user = await this.prismaService.user.update({
      where: { id: userId },
      data: userData,
    });
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    if (isPassword) {
      const hash = await bcrypt.hash(password, 10);
      await this.prismaService.user.update({
        where: { id: userId },
        data: { password: hash },
      });
    }
    return user;
  }
}

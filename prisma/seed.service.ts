import { Injectable } from '@nestjs/common';
import { RoleType } from '@prisma/client';
import { PrismaService } from '../src/prisma.service'; // Импортируем PrismaService

@Injectable()
export class SeedService {
  constructor(private prisma: PrismaService) {}

  async seed(created: boolean) {
    if (created) {
      await this.createRoles();
      await this.createAdmin();
    }
  }
  private async createAdmin() {
    await this.prisma.user.upsert({
      where: { phone: '89999999999' },
      update: {},
      create: {
        phone: '89999999999',
        password: 'admin',
        name: 'admin',
        surName: 'admin',
        roleId: 1,
      },
    });

    console.log('Admin created');
  }
  private async createRoles() {
    await this.prisma.role.upsert({
      where: { name: RoleType.ADMIN },
      update: {},
      create: {
        name: RoleType.ADMIN,
        description: 'Administrator with full access',
      },
    });
    await this.prisma.role.upsert({
      where: { name: RoleType.USER },
      update: {},
      create: {
        name: RoleType.USER,
        description: 'Regular user with limited access',
      },
    });

    console.log('Roles created ');
  }
}

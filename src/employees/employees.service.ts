import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmploeeCreateInput) {
    return this.databaseService.emploee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: Role) {
    if (role) {
      return this.databaseService.emploee.findMany({
        where: {
          role,
        },
      });
    }
    return this.databaseService.emploee.findMany();
  }

  async findOne(id: number) {
    return this.databaseService.emploee.findUnique({
      where: { id },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmploeeUpdateInput) {
    return this.databaseService.emploee.update({
      where: { id },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return this.databaseService.emploee.delete({
      where: { id },
    });
  }
}

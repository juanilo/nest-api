import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'johndoe@example.com', role: 'admin' },
    { id: 2, name: 'Jane Doe', email: 'janedoe@example.com', role: 'user' },
  ];
  findAll(role?: 'admin' | 'user') {
    if (role) {
      const filteredUsers = this.users.filter((user) => user.role === role);
      if (!filteredUsers.length) throw new NotFoundException('No users found');
      return filteredUsers;
    }
    return this.users;
  }
  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
  create(createUser: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = { id: usersByHighestId[0].id + 1, ...createUser };
    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updateUser: UpdateUserDto) {
    const foundIndex = this.users.findIndex((u) => u.id === id);
    if (foundIndex !== -1) {
      this.users[foundIndex] = { ...this.users[foundIndex], ...updateUser };
    }
    return this.users[foundIndex];
  }
  delete(id: number) {
    const removedUser = this.findOne(id);
    if (removedUser) {
      this.users = this.users.filter((user) => user.id !== id);
    }
    return removedUser;
  }
}

import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    return this.userRepository.create(createUserDto);
  }

  async findById(id: string): Promise<any> {
    return this.userRepository.findById(id);
  }

  async findByEmail(email: string): Promise<any> {
    return this.userRepository.findByEmail(email);
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return this.userRepository.update(id, updateUserDto);
  }

  async delete(id: string): Promise<any> {
    return this.userRepository.delete(id);
  }

  async findAll(): Promise<any> {
    return this.userRepository.findAll();
  }
}

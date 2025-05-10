import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as DBUser } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(DBUser)
    private userRepository: Repository<DBUser>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({
      where: { id },
    });
  }

  async findOneByUsername(username: string) {
    const findUserByUsername = await this.userRepository.findOne({
      where: {
        name: username,
      },
    });
    console.log('findUserByUsername', findUserByUsername);
    return findUserByUsername;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const result = await this.userRepository.update(id, updateUserDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Project ${id} not found`);
    }
    return { deleted: true };
  }
}

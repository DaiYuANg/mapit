import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtConfig, UserConfig } from '../config/configuration';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { username, email, password } = createUserDto;
    const exist = await this.userRepository.findOne({ where: [{ username }, { email }] });
    if (exist) {
      throw new BadRequestException('用户名或邮箱已存在');
    }
    const hash = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({ ...createUserDto, password: hash });
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException('用户不存在');
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user);
  }

  async login(username: string, password: string) {
    const userConfig = this.configService.get<UserConfig>('user');
    if (username === userConfig?.defaultUser && password === userConfig?.defaultUserPassword) {
      return {
        data: {
          token: this.jwtService.sign(
            { sub: 1, username: userConfig.defaultUser },
            {
              secret: this.configService.get<JwtConfig>('jwt')?.secret,
            },
          ),
          user: {
            id: 1,
            username: userConfig.defaultUser,
            email: '',
          },
        },
        code: '200',
        message: '登录成功',
      };
    }
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) throw new BadRequestException('用户不存在');
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new BadRequestException('密码错误');
    // 生成 token
    const payload = { sub: user.id, username: user.username };
    const token = this.jwtService.sign(payload);
    return {
      data: {
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      },
      code: '200',
      message: '登录成功',
    };
  }
}

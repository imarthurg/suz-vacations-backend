import { Injectable, BadRequestException } from '@nestjs/common';
import bcrypt from 'bcrypt';

import { checkExists } from '@App/common/helpers/validations';
import { UserCreateDto, UserUpdateDto } from '../dto';
import { UserEntity } from './../entities/user.entity';
import { UsersRepository } from '../repositories';
import { checkNotExists } from '@App/common/helpers/validations';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async findOneByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      relations: ['company'],
    });
  }

  async findAll() {
    return this.usersRepository.find({ relations: ['company'] });
  }

  async create(data: UserCreateDto) {
    const checkUser = await this.usersRepository.findOne({ email: data.email });
    checkExists(checkUser, 'Email already used');

    const { password, ...restData } = data;
    const { psswd, salt } = await this.encryptPassword(password);

    let user = this.usersRepository.create({
      ...restData,
      password: psswd,
      salt,
    });

    user = await this.usersRepository.save(user);
    delete user.password;
    delete user.salt;

    return user;
  }

  async update(id: string, data: UserUpdateDto | Partial<UserEntity>) {
    const user = await this.usersRepository.findOne(id);
    checkNotExists(user, 'User not exists');

    const userToUpdate = this.usersRepository.create({ ...user, ...data });

    return this.usersRepository.save(userToUpdate);
  }

  async encryptPassword(
    password: string,
    customSalt?: string,
  ): Promise<{ psswd: string; salt: string }> {
    const salt = customSalt || (await bcrypt.genSalt(10));

    if (!password) {
      throw new BadRequestException('Password not defined');
    }

    const encryptedPassword = await bcrypt.hash(password, salt);

    return { psswd: encryptedPassword, salt };
  }
}

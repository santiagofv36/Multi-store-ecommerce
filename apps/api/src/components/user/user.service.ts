import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  IUser,
  Pagination,
  TCreateUserInput,
  TFilterUsersInput,
  TFindUserByEmail,
} from '@packages/models';
import { FilterQuery, Model, ProjectionType, QueryOptions } from 'mongoose';
import { User } from './schema/user.model';
import { IService } from 'src/core/service.interface';

@Injectable()
export class UserService implements IService<IUser, TFilterUsersInput> {
  constructor(
    @InjectModel(User.name)
    private User: Model<IUser>,
  ) {}

  async find(
    filter: FilterQuery<IUser>,
    projection?: ProjectionType<IUser> | null,
    options?: QueryOptions<IUser> | null,
  ): Promise<IUser[] | IUser> {
    return this.User.find(filter, projection, options)
      .select('-password')
      .populate('address'); // Here is the population added if needed
  }

  async findOne(
    filter?: FilterQuery<IUser>,
    projection?: ProjectionType<IUser> | null,
    options?: QueryOptions<IUser> | null,
  ): Promise<IUser | null> {
    return this.User.findOne(filter, projection, options);
  }

  async paginate(
    data: TFilterUsersInput,
    page?: number,
    perPage?: number,
  ): Promise<Pagination<IUser>> {
    throw new Error('not implemented');
  }

  async validateUserExistance(
    data: TFindUserByEmail,
  ): Promise<IUser | BadRequestException | null> {
    const user = await this.findOne({
      email: data.email,
    });

    if (user) {
      throw new BadRequestException('Not valid Email');
    }
    return user;
  }

  async createUser(data: TCreateUserInput) {
    await this.validateUserExistance({ email: data.email });

    const user = await this.User.create(data);

    return user;
  }
}

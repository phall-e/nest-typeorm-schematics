import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PasswordHash } from '@utils/password-hash.util';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ){}

  public async create(dto: CreateUserRequestDto): Promise<UserResponseDto> {
    try {
      let entity = await this.userRepository.create({
        ...dto,
        password: await PasswordHash.hash(dto.password),
      });
      entity = await this.userRepository.save(entity);
      return UserMapper.toDto(entity);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  public async findAll(): Promise<UserResponseDto[]> {
    try {
      const entities = await this.userRepository.find();
      const items = await Promise.all(
        entities.map((item) => UserMapper.toDto(item))
      );
      return items;
    } catch (error) { 
      throw new BadRequestException(error?.message);
    }
  }

  public async findOne(id: number): Promise<UserResponseDto> {
    try {
      const entity = await this.userRepository.findOneBy({ id });
      if (!entity) throw new NotFoundException();
      return UserMapper.toDto(entity);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  public async update(id: number, dto: UpdateUserRequestDto): Promise<UserResponseDto> {
    try {
      let entity = await this.userRepository.findOneBy({ id });
      if (!entity) throw new NotFoundException();
      entity = UserMapper.toUpdateEntity(entity, dto);
      entity = await this.userRepository.save(entity);
      return UserMapper.toDto(entity);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  public async remove(id: number): Promise<UserResponseDto> {
    try {
      const entity = await this.userRepository.findOneBy({ id });
      if (!entity) throw new NotFoundException();
      await this.userRepository.softDelete(id);
      return UserMapper.toDto(entity);
    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }
}

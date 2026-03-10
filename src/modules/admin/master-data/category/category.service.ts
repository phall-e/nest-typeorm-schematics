import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryRequestDto } from './dto/create-category-request.dto';
import { UpdateCategoryRequestDto } from './dto/update-category-request.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';
import { CategoryMapper } from './category.mapper';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>,
  ) {}

  public async create(dto: CreateCategoryRequestDto): Promise<CategoryResponseDto> {
    try {

      let entity = CategoryMapper.toCreateEntity(dto);
      entity = await this.categoryRepository.save(entity);

      return await CategoryMapper.toDto(entity);

    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  public async findAll(): Promise<CategoryResponseDto[]> {
    try {

      const entities = await this.categoryRepository.find();

      const items = await Promise.all(
        entities.map((item) => CategoryMapper.toDto(item))
      );

      return items;

    } catch (error) {
      throw new BadRequestException(error?.message);
    }
  }

  public async findOne(id: number): Promise<CategoryResponseDto> {
    try {

      const entity = await this.categoryRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      return await CategoryMapper.toDto(entity);

    } catch (error) {

      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error?.message);
    }
  }

  public async update(id: number, dto: UpdateCategoryRequestDto): Promise<CategoryResponseDto> {
    try {

      let entity = await this.categoryRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      entity = CategoryMapper.toUpdateEntity(entity, dto);

      entity = await this.categoryRepository.save(entity);

      return await CategoryMapper.toDto(entity);

    } catch (error) {

      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error?.message);
    }
  }

  public async remove(id: number): Promise<CategoryResponseDto> {
    try {

      const entity = await this.categoryRepository.findOneBy({ id });

      if (!entity) throw new NotFoundException();

      await this.categoryRepository.softDelete(id);

      return await CategoryMapper.toDto(entity);

    } catch (error) {

      if (error instanceof NotFoundException) throw error;

      throw new BadRequestException(error?.message);
    }
  }

}
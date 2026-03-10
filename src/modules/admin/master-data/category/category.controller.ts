import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryRequestDto } from './dto/create-category-request.dto';
import { UpdateCategoryRequestDto } from './dto/update-category-request.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';

@Controller({
  path: 'admin/master-data/category',
  version: '1',
})
export class CategoryController {

  constructor(
    private categoryService: CategoryService,
  ) {}

  @Post()
  @ApiResponse({
    status: 201,
    type: CategoryResponseDto,
    description: 'Category created successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  public create(
    @Body() dto: CreateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.create(dto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: [CategoryResponseDto],
    description: 'Category list',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  public findAll(): Promise<CategoryResponseDto[]> {
    return this.categoryService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: CategoryResponseDto,
    description: 'Find one of Category',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({
    status: 200,
    type: CategoryResponseDto,
    description: 'Category updated successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryRequestDto,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: CategoryResponseDto,
    description: 'Category deleted successfully',
  })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  @ApiNotFoundResponse({ description: 'Not found' })
  public remove(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<CategoryResponseDto> {
    return this.categoryService.remove(id);
  }
}
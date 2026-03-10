import { Controller, Get, Post, Body, Param, Delete, Put, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserRequestDto } from './dto/create-user-request.dto';
import { UpdateUserRequestDto } from './dto/update-user-request.dto';
import { ApiForbiddenResponse, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserResponseDto } from './dto/user-response.dto';

@Controller({
  path: 'admin/system/users',
  version: '1',
})
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @ApiResponse({ status: 201, type: UserResponseDto, description: 'User created successfully' })
  @ApiForbiddenResponse({ description: 'Forbiden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  public create(@Body() dto: CreateUserRequestDto): Promise<UserResponseDto> {
    return this.userService.create(dto);
  }

  @Get()
  @ApiResponse({ status: 200, type: [UserResponseDto], description: 'Users list' })
  @ApiForbiddenResponse({ description: 'Forbiden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  public findAll(): Promise<UserResponseDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: UserResponseDto, description: 'Find one of user' })
  @ApiForbiddenResponse({ description: 'Forbiden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  public findOne(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
    return this.userService.findOne(id);
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: UserResponseDto, description: 'User updated successfully' })
  @ApiForbiddenResponse({ description: 'Forbiden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  public update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserRequestDto): Promise<UserResponseDto> {
    return this.userService.update(id, dto);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: UserResponseDto, description: 'User deleted successfully' })
  @ApiForbiddenResponse({ description: 'Forbiden' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized'})
  public remove(@Param('id', ParseIntPipe) id: number): Promise<UserResponseDto> {
    return this.userService.remove(id);
  }
}

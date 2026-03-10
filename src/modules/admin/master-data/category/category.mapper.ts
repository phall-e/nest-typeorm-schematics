import { CreateCategoryRequestDto } from "./dto/create-category-request.dto";
import { UpdateCategoryRequestDto } from "./dto/update-category-request.dto";
import { CategoryResponseDto } from "./dto/category-response.dto";
import { CategoryEntity } from "./entities/category.entity";
import { UserMapper } from "@modules/admin/system/user/user.mapper";

export class CategoryMapper {

    public static async toDto(entity: CategoryEntity): Promise<CategoryResponseDto> {
        const dto = new CategoryResponseDto();

        dto.id = entity.id;
        dto.createdByUserId = entity.createdByUserId;
        
        dto.code = entity.code;
        
        dto.nameEn = entity.nameEn;
        
        dto.nameKh = entity.nameKh;
        
        dto.description = entity.description;
        
        dto.createdAt = entity.createdAt;
        dto.updatedAt = entity.updatedAt;
        dto.deletedAt = entity.deletedAt;

        if (entity.createdByUser) {
            dto.createdByUser = await UserMapper.toDto(entity.createdByUser);
        }

        return dto;
    }

    public static toCreateEntity(dto: CreateCategoryRequestDto): CategoryEntity {
        const entity = new CategoryEntity();
        
        entity.code = dto.code;
        
        entity.nameEn = dto.nameEn;
        
        entity.nameKh = dto.nameKh;
        
        entity.description = dto.description;
        
        entity.createdByUserId = dto.createdByUserId;

        return entity;
    }

    public static toUpdateEntity(entity: CategoryEntity, dto: UpdateCategoryRequestDto): CategoryEntity {
        
        entity.code = dto.code;
        
        entity.nameEn = dto.nameEn;
        
        entity.nameKh = dto.nameKh;
        
        entity.description = dto.description;
        
        return entity;
    }

}
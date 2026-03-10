import { BaseEntity } from "@database/entities/base.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    schema: 'admin',
    name: 'users',
})
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn({
        name: 'id',
    })
    id: number;
    
    @Column({
        name: 'username',
        type: 'varchar',
        length: '150',
        unique: true,
        nullable: false,
    })
    username: string;

    @Column({
        name: 'email',
        type: 'varchar',
        length: '150',
        unique: true,
        nullable: false,
    })
    email: string;

    @Column({
        name: 'password',
        type: 'varchar',
        length: '260',
        nullable: false,
    })
    password: string;

    @Column({
        name: 'is_super_user',
        type: 'boolean',
        nullable: true,
        default: null,
    })
    isSuperUser: boolean;

    @Column({
        name: 'is_active',
        type: 'boolean',
        nullable: false,
        default: true,
    })
    isActive: boolean;

    constructor(partial?: Partial<UserEntity>) {
        super();
        Object.assign(this, partial);
    }
}

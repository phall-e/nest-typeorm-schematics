import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { commonFields } from "../common.fields";

const tableName = 'admin.users';

export class CustomerTypeMigration1764984877769 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isPrimary: true,
                        isGenerated: true,
                        isNullable: false,
                    },
                    {
                        name: 'username',
                        type: 'varchar',
                        length: '150',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '150',
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '260',
                        isNullable: false,
                    },
                    {
                        name: 'is_super_user',
                        type: 'boolean',
                        isNullable: true,
                    },
                    {
                        name: 'is_active',
                        type: 'boolean',
                        isNullable: false,
                        default: true,
                    },
                   
                    ...commonFields,
                ],
            }),
            true,
        );

        // const foreignKeys = [
        //     { column: 'created_by_id', refTable: 'admin.users' },
        // ];  

        // for (const fk of foreignKeys) {
        //     await queryRunner.createForeignKey(
        //         tableName,
        //         new TableForeignKey({
        //             columnNames: [fk.column],
        //             referencedColumnNames: ['id'],
        //             referencedTableName: fk.refTable,
        //             onDelete: 'SET NULL'
        //         })
        //     )
        // }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(tableName);
        if (table) {
            for (const fk of table.foreignKeys) {
                await queryRunner.dropForeignKey(tableName, fk);
            }
            await queryRunner.dropTable(tableName);
        }
    }

}

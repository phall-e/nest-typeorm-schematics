import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { commonFields } from "../common.fields";

const tableName = 'admin.category';


export class CategoryMigration1773126680226 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'integer',
                        isGenerated: true,
                        generationStrategy: 'increment',
                        isPrimary: true,
                        isNullable: false,
                    },
                     
                    {
                        name: 'code',
                        type: 'varchar',
                        isNullable: false,
                    },
                     
                    {
                        name: 'name_en',
                        type: 'varchar',
                        isNullable: false,
                    },
                     
                    {
                        name: 'name_kh',
                        type: 'varchar',
                        isNullable: false,
                    },
                     
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: false,
                    },
                    
                    ...commonFields,
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable(tableName);
        if (!table) return;

        await queryRunner.dropTable(tableName, true);
    }

}

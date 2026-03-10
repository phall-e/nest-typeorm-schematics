import * as bcrypt from 'bcrypt';
import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { users } from './user.seed';
import { UserEntity } from '@modules/admin/system/user/entities/user.entity';

export default class MainSeeder implements Seeder {
    public async run(database: DataSource): Promise<void> {
        console.log('*************Database is seeding*****************');

        const userHashed = await Promise.all(
            users.map( async(item) =>( {
                ...item,
                password: await bcrypt.hash(item.password, 10),
            })),
        );

        await database.manager.save(UserEntity, userHashed);

        console.log('************Database is seeded successfully****************');
    }
}

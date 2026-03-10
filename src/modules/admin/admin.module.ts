import { Module } from '@nestjs/common';
import { MasterDataModule } from './master-data/master-data.module';
import { SystemModule } from './system/system.module';

@Module({
  imports: [MasterDataModule, SystemModule]
})
export class AdminModule {}

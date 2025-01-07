import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntriesService } from './entries.service';
import { EntriesController } from './entries.controller';
import { Entry } from './entities/entry.entity';
//import { Customer } from '../customers/entities/customer.entity';
//import { Club } from '../clubs/entities/club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entry])], //[Entry, Customer, Club]
  controllers: [EntriesController],
  providers: [EntriesService],
})
export class EntriesModule {}

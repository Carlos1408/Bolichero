import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Entry } from './entities/entry.entity';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';

@Injectable()
export class EntriesService {
  constructor(
    @InjectRepository(Entry)
    private readonly entryRepository: Repository<Entry>,
  ) {}

  create(createEntryDto: CreateEntryDto) {
    const entry = this.entryRepository.create(createEntryDto);
    return this.entryRepository.save(entry);
  }

  findAll() {
    return this.entryRepository.find({ relations: ['customer', 'club'] });
  }

  findOne(id: string) {
    return this.entryRepository.findOne(id, { relations: ['customer', 'club'] });
  }

  async update(id: string, updateEntryDto: UpdateEntryDto) {
    await this.entryRepository.update(id, updateEntryDto);
    return this.findOne(id);
  }

  async remove(id: string) {
    const entry = await this.findOne(id);
    return this.entryRepository.remove(entry);
  }
}

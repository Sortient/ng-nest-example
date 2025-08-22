import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from 'items/item.entity';
import { CreateItemDto } from 'items/dto/create-item.dto';
import { NexusService } from '../nexus/nexus.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
    private readonly nexusService: NexusService,
  ) {}

  async create(createItemDto: CreateItemDto, file: Express.Multer.File): Promise<Item> {
    try {
      const fileUrl = await this.nexusService.uploadFile('test-storage', file);
      const newItem = this.itemsRepository.create({
        ...createItemDto,
        location:fileUrl,
      });
      return await this.itemsRepository.save(newItem);
    } catch (error) {
      console.error('Database save failed:', error);
      throw new InternalServerErrorException(
        'A database error occurred while creating the item.'
      );
    }
  }

  findAll(): Promise<Item[]> {
    return this.itemsRepository.find();
  }
}

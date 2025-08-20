import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from 'items/item.entity';
import { CreateItemDto } from 'items/dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<Item> {
    try {
      const newItem = this.itemsRepository.create(createItemDto);
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

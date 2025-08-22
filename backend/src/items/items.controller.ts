import { Controller, Get, Post, Body, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from 'items/dto/create-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Express } from 'express'; // This import is crucial!

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) 
  create(
    @Body() createItemDto: CreateItemDto,
  
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100000000 })
        ]
      })
    ) file: Express.Multer.File,
  ) {
    return this.itemsService.create(createItemDto, file);
  }

  @Get()
  findAll() {
    return this.itemsService.findAll();
  }
}

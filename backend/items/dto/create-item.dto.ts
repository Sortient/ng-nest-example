import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { ItemType } from '../item.entity';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  version: string;

  @IsEnum(ItemType)
  type: ItemType;

  @IsUrl()
  @IsNotEmpty()
  location: string;
}

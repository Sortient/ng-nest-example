import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum ItemType {
  LIBRARY = 'library',
  FRAMEWORK = 'framework',
  TOOL = 'tool',
  SERVICE = 'service',
}

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  version: string;

  @Column({
    type: 'simple-enum',
    enum: ItemType,
  })
  type: ItemType;

  @Column()
  location: string;

  @CreateDateColumn()
  createdAt: Date;
}

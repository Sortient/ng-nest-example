export enum ItemType {
  LIBRARY = 'library',
  FRAMEWORK = 'framework',
  TOOL = 'tool',
  SERVICE = 'service',
}

export interface Item {
  id: number;
  name: string;
  version: string;
  type: ItemType;
  location: string;
  createdAt: Date;
}
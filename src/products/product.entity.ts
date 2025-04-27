import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @ApiProperty({ example: 1, description: 'unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Alaska', description: 'The name of the product' })
  @Column()
  name: string;

  @ApiProperty({
    example: 'Vitamin and Miniral Rich Milk Drink',
    description: 'Description of the product',
  })
  @Column('text')
  description: string;

  @ApiProperty({ example: 'Milk', description: 'Product category' })
  @Column()
  category: string;

  @ApiProperty({ example: 999.99, description: 'Product price' })
  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}

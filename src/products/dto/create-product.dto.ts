import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Alaska', description: 'The name of the product' })
  name: string;

  @ApiProperty({
    example: 'Vitamin and Miniral Rich Milk Drink',
    description: 'Description of the product',
  })
  description: string;

  @ApiProperty({ example: 'Milk', description: 'Product category' })
  category: string;

  @ApiProperty({ example: 999.99, description: 'Product price' })
  price: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({
    example: 'Alaska',
    description: 'The name of the product',
    required: true,
  })
  name: string;

  @ApiProperty({
    example: 'Vitamin and Miniral Rich Milk Drink',
    description: 'Description of the product',
    required: true,
  })
  description: string;

  @ApiProperty({
    example: 'Milk',
    description: 'Product category',
    required: true,
  })
  category: string;

  @ApiProperty({
    example: 999.99,
    description: 'Product price',
    required: true,
  })
  price: number;
}

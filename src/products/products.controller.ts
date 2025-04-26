import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productServices: ProductsService) {}

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productServices.create(dto);
  }

  @Get()
  findAll() {
    return this.productServices.findAll();
  }
}

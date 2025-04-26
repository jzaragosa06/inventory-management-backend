import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productServices.findOne(id);
  }

  @Get('search')
  search(@Query('query') query: string) {
    return this.productServices.search(query);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.productServices.deleteOne(id);
  }
  
}

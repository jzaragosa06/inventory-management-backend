import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/shared/enum/role.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { Product } from './product.entity';

@ApiTags('Products')
@ApiBearerAuth()
@Controller('products')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProductsController {
  constructor(private readonly productServices: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product successfully created.',
    type: Product,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Failed to create product.' })
  @SetMetadata('roles', [UserRole.ADMIN, UserRole.AUDITOR, UserRole.USER])
  create(@Body() dto: CreateProductDto) {
    return this.productServices.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Return all products.',
    type: [Product],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  @ApiResponse({ status: 500, description: 'Failed to fetch products.' })
  @SetMetadata('roles', [UserRole.ADMIN, UserRole.AUDITOR, UserRole.USER])
  findAll() {
    return this.productServices.findAll();
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products by name or description' })
  @ApiQuery({
    name: 'query',
    type: 'string',
    description: 'Search query string',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'Return matching products.',
    type: [Product],
  })
  @ApiResponse({ status: 500, description: 'Failed to search products.' })
  @SetMetadata('roles', [UserRole.ADMIN, UserRole.AUDITOR, UserRole.USER])
  search(@Query('query') query: string) {
    return this.productServices.search(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by id' })
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Return the product.',
    type: Product,
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 500, description: 'Failed to fetch product.' })
  @SetMetadata('roles', [UserRole.ADMIN, UserRole.AUDITOR, UserRole.USER])
  findOne(@Param('id') id: number) {
    return this.productServices.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  @ApiResponse({
    status: 200,
    description: 'Product successfully deleted.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'successfull deleted' },
        deleted: { type: 'object', $ref: '#/components/schemas/Product' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 500, description: 'Failed to delete product.' })
  @SetMetadata('roles', [UserRole.ADMIN])
  deleteOne(@Param('id') id: number) {
    return this.productServices.deleteOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', type: 'number', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({
    status: 200,
    description: 'Product successfully updated.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'product updated successfully' },
        updated: { type: 'object', $ref: '#/components/schemas/Product' },
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  @ApiResponse({ status: 500, description: 'Failed to update product.' })
  @SetMetadata('roles', [UserRole.AUDITOR])
  update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.productServices.update(id, dto);
  }
}
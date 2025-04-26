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

@Controller('products')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class ProductsController {
  constructor(private readonly productServices: ProductsService) {}

  @Post()
  @SetMetadata('roles', [UserRole.ADMIN, UserRole.AUDITOR, UserRole.USER])
  create(@Body() dto: CreateProductDto) {
    return this.productServices.create(dto);
  }

  @Get()
  @SetMetadata('roles', [UserRole.ADMIN, UserRole.AUDITOR, UserRole.USER])
  findAll() {
    return this.productServices.findAll();
  }

  @Get(':id')
  @SetMetadata('roles', [UserRole.ADMIN, UserRole.AUDITOR, UserRole.USER])
  findOne(@Param('id') id: number) {
    return this.productServices.findOne(id);
  }

  @Get('search')
  @SetMetadata('roles', [UserRole.ADMIN, UserRole.AUDITOR, UserRole.USER])
  search(@Query('query') query: string) {
    return this.productServices.search(query);
  }

  @Delete(':id')
  @SetMetadata('roles', [UserRole.ADMIN])
  deleteOne(@Param('id') id: number) {
    return this.productServices.deleteOne(id);
  }

  @Patch(':id')
  @SetMetadata('roles', [UserRole.AUDITOR])
  update(@Param('id') id: number, @Body() dto: UpdateProductDto) {
    return this.productServices.update(id, dto);
  }
}

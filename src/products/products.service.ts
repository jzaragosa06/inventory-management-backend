/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepo: Repository<Product>,
    ) {}

    create(data: ProductDto): Promise<Product> {
        const product = this.productRepo.create(data); 
        return this.productRepo.save(product); 
    }

    findAll(): Promise<Product[]> {
        return this.productRepo.find();
    }
}

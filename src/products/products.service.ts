import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Like, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productRepo: Repository<Product>,
    ) {}

    create(data: CreateProductDto): Promise<Product> {
        const product = this.productRepo.create(data); 
        return this.productRepo.save(product); 
    }

    findAll(): Promise<Product[]> {
        return this.productRepo.find();
    }

    findOne(id: number): Promise<Product | null> {
        return this.productRepo.findOneBy({id})
    }

    search(query: string): Promise<Product[]> {
        return this.productRepo.find({where: [
            {name: Like(`%${query}%`)}, 
            {description: Like(`%${query}%`)}
        ]})
    }
}

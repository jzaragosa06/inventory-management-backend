import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
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

    async create(data: CreateProductDto): Promise<Product> {
        try {
            const product = this.productRepo.create(data);
            return await this.productRepo.save(product);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create product');
        }
    }

    async findAll(): Promise<Product[]> {
        try {
            return await this.productRepo.find();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch products');
        }
    }

    async findOne(id: number): Promise<Product> {
        try {
            const product = await this.productRepo.findOneBy({ id });
            if (!product) {
                throw new NotFoundException(`Product with ID ${id} not found`);
            }
            return product;
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch product');
        }
    }

    async search(query: string): Promise<Product[]> {
        try {
            return await this.productRepo.find({
                where: [
                    { name: Like(`%${query}%`) },
                    { description: Like(`%${query}%`) }
                ]
            });
        } catch (error) {
            throw new InternalServerErrorException('Failed to search products');
        }
    }

    async deleteOne(id: number): Promise<Product> {
        try {
            const product = await this.productRepo.findOneBy({ id });
            if (!product) {
                throw new NotFoundException(`Product with ID ${id} not found`);
            }
            await this.productRepo.delete(id);
            return product;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            throw new InternalServerErrorException('Failed to delete product');
        }
    }
}
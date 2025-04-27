import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import {
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'Test Description',
    category: 'Test Category',
    price: 99.99,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            create: jest.fn().mockReturnValue(mockProduct),
            save: jest.fn().mockResolvedValue(mockProduct),
            find: jest.fn().mockResolvedValue([mockProduct]),
            findOne: jest.fn().mockResolvedValue(mockProduct),
            findOneBy: jest.fn().mockResolvedValue(mockProduct),
            merge: jest.fn(),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should successfully create a product', async () => {
      const createDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        category: 'Test Category',
        price: 99.99,
      };

      const result = await service.create(createDto);
      expect(result).toEqual(mockProduct);
      expect(repo.create).toHaveBeenCalledWith(createDto);
      expect(repo.save).toHaveBeenCalled();
    });

    it('should throw InternalServerErrorException on save failure', async () => {
      jest.spyOn(repo, 'save').mockRejectedValue(new Error());
      const createDto: CreateProductDto = {
        name: 'Test Product',
        description: 'Test Description',
        category: 'Test Category',
        price: 99.99,
      };

      await expect(service.create(createDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockProduct]);
      expect(repo.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should find and return a product by id', async () => {
      const result = await service.findOne(1);
      expect(result).toEqual(mockProduct);
      expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw InternalServerErrorException when product not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(999)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const updateDto: UpdateProductDto = {
        name: 'Updated Product',
        description: 'Updated Description',
        category: 'Updated Category',
        price: 199.99,
      };

      const result = await service.update(1, updateDto);
      expect(result.message).toBe('product updated successfully');
      expect(result.updated).toEqual(mockProduct);
    });

    it('should throw InternalServerErrorException when product not found', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
      const updateDto: UpdateProductDto = {
        name: 'Updated Product',
        description: 'Updated Description',
        category: 'Updated Category',
        price: 199.99,
      };

      await expect(service.update(999, updateDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('deleteOne', () => {
    it('should delete a product', async () => {
      const result = await service.deleteOne(1);
      expect(result.message).toBe('successfull deleted');
      expect(result.deleted).toEqual(mockProduct);
      expect(repo.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException when product not found', async () => {
      jest.spyOn(repo, 'findOneBy').mockResolvedValue(null);
      await expect(service.deleteOne(999)).rejects.toThrow(NotFoundException);
    });
  });
});

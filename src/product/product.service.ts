import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './Dtos/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/App.Entities/Product/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

    constructor(
        @InjectRepository(Product)
        private readonly _productRepository: Repository<Product>,) {}

    async createProduct(product: CreateProductDto){
        const newProduct = await this._productRepository.create(product);
        const savedProduct = await this._productRepository.save(newProduct);
        return savedProduct;
    }

    async getAllProducts() {
        return await this._productRepository.find();
    }
    async updateProduct(id: string, product: CreateProductDto){
        const existingProduct = await this._productRepository.findOne({ where: { id } });
        if (!existingProduct) {
            throw new Error('Product not found');
        }
        const updatedProduct = await this._productRepository.merge(existingProduct, product);
        return await this._productRepository.save(updatedProduct);
    }

    async deleteProduct(id: string) {
      return await this._productRepository.softDelete(id)
    }

    
}

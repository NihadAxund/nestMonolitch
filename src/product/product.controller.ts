import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './Dtos/create-product.dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
export class ProductController {

    constructor(private readonly _productService:ProductService) {}
    @Post()
    createProduct(@Body() product: CreateProductDto) {
        return this._productService.createProduct(product);
    }

    @Patch(':id')
    updateProduct(@Param('id') id: string, @Body() product: CreateProductDto)
    {
        return this._productService.updateProduct(id, product);
    }

    @Delete(':id/soft-delete')
    deleteProduct(@Param('id') id: string) {
        return this._productService.deleteProduct(id);
    }

    @Get()
    getAllProducts() {
        return this._productService.getAllProducts();
    }


}

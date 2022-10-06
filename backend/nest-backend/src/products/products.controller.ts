import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
@Controller('produse')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  @Post()
  async addProduct(
    @Body('name') productName: string,
    @Body('code') productCode: string,
    @Body('weight') productWeight: number,
    @Body('price') productPrice: number,
    @Body('color') productColor: string,
    @Body('isDeleted') productIsDeleted: boolean,
  ) {
    const insertedId = await this.productService.insertProduct(
      productName,
      productCode,
      productWeight,
      productPrice,
      productColor,
      productIsDeleted,
    );
    return { insertedId };
  }
  @Post('query')
  async getProductsByQuery(@Body() queryObject: any) {
    return await this.productService.getProductsByQuery(queryObject);
  }
  @Get()
  async getProducts() {
    return await this.productService.getProducts();
  }

  @Get(':id')
  async getProductById(@Param('id') productId: string) {
    return await this.productService.getProductById(productId);
  }
  @Patch(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body('name')
    productName: string,
    @Body('code')
    productCode: string,
    @Body('weight') productWeight: number,
    @Body('price') productPrice: number,
    @Body('color') productColor: string,
    @Body('isDeleted') productIsDeleted: boolean,
  ) {
    return await this.productService.updateProduct(
      productId,
      productName,
      productCode,
      productWeight,
      productPrice,
      productColor,
      productIsDeleted,
    );
  }
  @Delete(':id')
  async deleteProduct(@Param('id') productId: string) {
    return await this.productService.deleteProduct(productId);
  }
}

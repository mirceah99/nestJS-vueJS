import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';
import { InjectModel } from '@nestjs/mongoose/dist/common';
import { Model } from 'mongoose';
@Injectable()
export class ProductsService {
  private products: Product[] = [];
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
  ) {}
  async insertProduct(
    name: string,
    code: string,
    weight: number,
    price: number,
    color: string,
    isDeleted: boolean,
  ) {
    console.log('code', code);
    const newProduct = new this.productModel({
      name,
      weight,
      code,
      price,
      color,
      isDeleted,
    });
    console.log(newProduct);
    const insertedProduct = await newProduct.save();
    return insertedProduct.id as string;
  }
  async getProducts() {
    // CHECK IT WAS DELETED TODO
    const products = await this.productModel.find().exec();
    //TODO PLEASE LOOK OVER THIS MAP
    return await products.map(this.transformMongooseProductToMyProduct);
  }
  async getProductsByQuery(queryObject) {
    const { page = 1, limit = 10 } = queryObject;
    console.log(queryObject);
    const products = await this.productModel
      .find({ isDeleted: false })
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
    const count = await this.productModel.countDocuments({ isDeleted: false });
    console.log(count);
    //TODO PLEASE LOOK OVER THIS MAP
    return {
      products: await products.map(this.transformMongooseProductToMyProduct),
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }
  async getProductById(productId: string) {
    // CHECK IT WAS DELETED TODO
    return this.transformMongooseProductToMyProduct(
      await this._getProductById(productId),
    );
  }
  async updateProduct(
    productId: string,
    name: string,
    code: string,
    weight: number,
    price: number,
    color: string,
    isDeleted: boolean,
  ) {
    const updatedProduct = await this._getProductById(productId);
    updatedProduct.name = name ?? updatedProduct.name;
    updatedProduct.code = code;
    updatedProduct.weight = weight ?? updatedProduct.weight; //TODO check negative
    updatedProduct.price = price ?? updatedProduct.price; //TODO check negative
    updatedProduct.color = color ?? updatedProduct.color;
    updatedProduct.isDeleted = isDeleted ?? updatedProduct.isDeleted;
    return this.transformMongooseProductToMyProduct(
      await updatedProduct.save(),
    );
  }
  async deleteProduct(productId: string) {
    const deletedProduct = await this._getProductById(productId);
    deletedProduct.isDeleted = true;
    return this.transformMongooseProductToMyProduct(
      await deletedProduct.save(),
    );
  }
  private async _getProductById(productId: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(productId).exec();
    } catch (error) {
      throw new NotFoundException(
        `No product found with this id: ${productId}`,
      );
    }
    if (!product) {
      throw new NotFoundException(
        `No product found with this id: ${productId}`,
      );
    }
    if (product.isDeleted) {
      throw new NotFoundException(`Product with id ${productId} is deleted`);
    }
    return product;
  }
  // PLEASE CHECK NEXT FUNCTION TYPE TODO
  private transformMongooseProductToMyProduct(product) {
    return {
      id: product.id,
      name: product.name,
      weight: product.weight,
      price: product.price,
      color: product.color,
      code: product.code,
      isDeleted: product.isDeleted,
    };
  }
}

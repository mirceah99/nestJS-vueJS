import * as mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  weight: { type: Number, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
});
export interface Product extends mongoose.Document {
  id: string;
  code: string;
  name: string;
  weight: number;
  price: number;
  color: string;
  isDeleted: boolean;
}

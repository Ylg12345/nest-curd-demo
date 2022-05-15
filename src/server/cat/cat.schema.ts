import { Schema } from 'mongoose';

export const catSchema = new Schema({
  _id: { type: String, required: true },
  cat_species: { type: String, required: true },
  cat_age: { type: Number, required: true },
});

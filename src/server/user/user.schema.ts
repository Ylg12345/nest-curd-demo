import { Schema } from 'mongoose';

export const userSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

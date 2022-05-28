import { Schema } from 'mongoose';
import { hashSync } from 'bcryptjs';

export const userSchema = new Schema({
  username: { type: String, required: true },
  password: {
    type: String,
    required: true,
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  },
  avatar: {
    type: String,
    default: 'fce36ea855c5d71ec2ad7eca34d75fec1653740608542.webp',
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

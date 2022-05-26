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
    default:
      'https://img1.baidu.com/it/u=1434533787,33664708&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
});

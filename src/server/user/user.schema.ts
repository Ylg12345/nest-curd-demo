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
});

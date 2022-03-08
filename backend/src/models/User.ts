import { model, Schema } from 'mongoose';
import jwt from "jsonwebtoken";
import secret from '../config/jwtsecret';

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true });

const User = model('User', UserSchema, 'users');

export default User;
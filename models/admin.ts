import mongoose, { Document, Schema } from 'mongoose';
import { IAdmin } from '../interfaces';

const adminSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<IAdmin & Document>('Admin', adminSchema);

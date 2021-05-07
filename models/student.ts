import mongoose, { Document, Schema } from 'mongoose';
import { IStudent } from '../interfaces';

const studentSchema = new Schema({
  name: { type: String, required: true },
  dateSubmitted: { type: Number, default: Date.now, required: true },
  expireAt: { type: Date, default: Date.now, index: { expires: '14d' } },
  goodAnswers: { type: Object, required: true },
  badAnswers: { type: Object, required: true },
});

export default mongoose.model<IStudent & Document>('Student', studentSchema);

import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  role: 'athlete' | 'coach' | 'admin';
  teamId: string;
  totalPoints: number;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true, enum: ['athlete', 'coach', 'admin'] },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  totalPoints: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

export const User = model<IUser>('User', userSchema);

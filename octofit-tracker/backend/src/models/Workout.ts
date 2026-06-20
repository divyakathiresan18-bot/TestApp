import { Schema, model, Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  durationMinutes: number;
  focusArea: string;
  createdAt: Date;
}

const workoutSchema = new Schema<IWorkout>({
  name: { type: String, required: true },
  difficulty: { type: String, required: true, enum: ['beginner', 'intermediate', 'advanced'] },
  durationMinutes: { type: Number, required: true },
  focusArea: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const Workout = model<IWorkout>('Workout', workoutSchema);

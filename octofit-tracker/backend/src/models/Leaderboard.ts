import { Schema, model, Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  userId: string;
  rank: number;
  points: number;
  teamId: string;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  rank: { type: Number, required: true },
  points: { type: Number, required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true }
});

export const Leaderboard = model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);

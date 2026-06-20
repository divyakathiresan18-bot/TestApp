import express from 'express';
import { connectDatabase } from '../database';
import { User } from './models/User';
import { Team } from './models/Team';
import { Activity } from './models/Activity';
import { Leaderboard } from './models/Leaderboard';
import { Workout } from './models/Workout';

const app = express();
const PORT = process.env.PORT || 8000;
const CODESPACE_NAME = process.env.CODESPACE_NAME;
const API_URL = CODESPACE_NAME
  ? `https://8000-${CODESPACE_NAME}.githubpreview.dev`
  : `http://localhost:${PORT}`;

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', port: PORT, apiUrl: API_URL, db: MONGO_URI });
});

app.get('/api/users', async (_req, res) => {
  const users = await User.find().lean();
  res.json(users);
});

app.get('/api/teams', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json(teams);
});

app.get('/api/activities', async (_req, res) => {
  const activities = await Activity.find().lean();
  res.json(activities);
});

app.get('/api/leaderboard', async (_req, res) => {
  const leaderboard = await Leaderboard.find().lean();
  res.json(leaderboard);
});

app.get('/api/workouts', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

connectDatabase()
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Backend server running on ${API_URL}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

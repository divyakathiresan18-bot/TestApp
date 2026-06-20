import mongoose from 'mongoose';
import { User } from '../models/User';
import { Team } from '../models/Team';
import { Activity } from '../models/Activity';
import { Leaderboard } from '../models/Leaderboard';
import { Workout } from '../models/Workout';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');

  await mongoose.connect(MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Leaderboard.deleteMany({}),
    Workout.deleteMany({})
  ]);

  const teams = await Team.create([
    { name: 'Team Apex', description: 'A competitive athletics team focused on speed and endurance', members: [] },
    { name: 'Team Momentum', description: 'A wellness team emphasizing balanced workouts and recovery', members: [] }
  ]);

  const users = await User.create([
    { name: 'Ava Clark', email: 'ava.clark@example.com', role: 'athlete', teamId: teams[0]._id.toString(), totalPoints: 1240 },
    { name: 'Marco Reyes', email: 'marco.reyes@example.com', role: 'athlete', teamId: teams[0]._id.toString(), totalPoints: 980 },
    { name: 'Nia Patel', email: 'nia.patel@example.com', role: 'coach', teamId: teams[1]._id.toString(), totalPoints: 640 }
  ]);

  teams[0].members = [users[0]._id.toString(), users[1]._id.toString()];
  teams[1].members = [users[2]._id.toString()];
  await Promise.all(teams.map((team) => team.save()));

  const workouts = await Workout.create([
    { name: 'Morning HIIT', difficulty: 'intermediate', durationMinutes: 35, focusArea: 'full body' },
    { name: 'Recovery Stretch', difficulty: 'beginner', durationMinutes: 20, focusArea: 'mobility' },
    { name: 'Strength Circuit', difficulty: 'advanced', durationMinutes: 50, focusArea: 'strength' }
  ]);

  const activities = await Activity.create([
    { userId: users[0]._id.toString(), type: 'running', durationMinutes: 45, caloriesBurned: 520, date: new Date('2026-06-15T07:30:00Z') },
    { userId: users[1]._id.toString(), type: 'cycling', durationMinutes: 60, caloriesBurned: 630, date: new Date('2026-06-16T09:00:00Z') },
    { userId: users[2]._id.toString(), type: 'yoga', durationMinutes: 40, caloriesBurned: 210, date: new Date('2026-06-17T18:00:00Z') }
  ]);

  await Leaderboard.create([
    { userId: users[0]._id.toString(), rank: 1, points: 1240, teamId: teams[0]._id.toString() },
    { userId: users[1]._id.toString(), rank: 2, points: 980, teamId: teams[0]._id.toString() },
    { userId: users[2]._id.toString(), rank: 3, points: 640, teamId: teams[1]._id.toString() }
  ]);

  console.log('Seed complete:');
  console.log(`  teams: ${teams.length}`);
  console.log(`  users: ${users.length}`);
  console.log(`  workouts: ${workouts.length}`);
  console.log(`  activities: ${activities.length}`);

  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed script error:', error);
  process.exit(1);
});

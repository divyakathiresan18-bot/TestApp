import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <header className="app-header">
          <h1>OctoFit Tracker</h1>
          <nav>
            <Link to="/users">Users</Link>
            <Link to="/teams">Teams</Link>
            <Link to="/activities">Activities</Link>
            <Link to="/leaderboard">Leaderboard</Link>
            <Link to="/workouts">Workouts</Link>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
            <Route
              path="/"
              element={<p>Select a section to view OctoFit data.</p>}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { useEffect, useState } from 'react';

export type LeaderboardEntry = {
  _id: string;
  userId: string;
  rank: number;
  points: number;
  teamId: string;
};

import { API_BASE, normalizeApiResponse } from '../utils/api';

// Expected backend API endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/
function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/leaderboard/`)
      .then((res) => res.json())
      .then((data) => setEntries(normalizeApiResponse<LeaderboardEntry>(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {error && <p className="error">{error}</p>}
      <ol>
        {entries.map((entry) => (
          <li key={entry._id}>
            {entry.rank}. {entry.userId} - {entry.points} pts
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Leaderboard;

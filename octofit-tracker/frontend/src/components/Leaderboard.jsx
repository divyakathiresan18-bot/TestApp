import { useEffect, useState } from 'react';
import { API_BASE, normalizeApiResponse } from '../utils/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/leaderboard/`)
      .then((res) => res.json())
      .then((data) => setEntries(normalizeApiResponse(data)))
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

import { useEffect, useState } from 'react';
import { API_BASE, normalizeApiResponse } from '../utils/api';

// Expected backend API endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/
function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/teams/`)
      .then((res) => res.json())
      .then((data) => setTeams(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {teams.map((team) => (
          <li key={team._id}>
            <strong>{team.name}</strong>: {team.description}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Teams;

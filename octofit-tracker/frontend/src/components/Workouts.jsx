import { useEffect, useState } from 'react';
import { API_BASE, normalizeApiResponse } from '../utils/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/workouts/`)
      .then((res) => res.json())
      .then((data) => setWorkouts(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {workouts.map((workout) => (
          <li key={workout._id}>
            {workout.name} - {workout.difficulty} ({workout.durationMinutes} min)
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Workouts;

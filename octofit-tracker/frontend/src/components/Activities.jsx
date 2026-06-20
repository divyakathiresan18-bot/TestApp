import { useEffect, useState } from 'react';
import { API_BASE, normalizeApiResponse } from '../utils/api';

// Expected backend API endpoint:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/
function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/activities/`)
      .then((res) => res.json())
      .then((data) => setActivities(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {activities.map((activity) => (
          <li key={activity._id}>
            {activity.type} by {activity.userId} - {activity.durationMinutes} min
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Activities;

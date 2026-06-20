import { useEffect, useState } from 'react';

export type Activity = {
  _id: string;
  userId: string;
  type: string;
  durationMinutes: number;
  caloriesBurned: number;
  date: string;
};

const API_BASE = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/activities`)
      .then((res) => res.json())
      .then((data) => setActivities(Array.isArray(data) ? data : []))
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

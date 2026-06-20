import { useEffect, useState } from 'react';
import { API_BASE, normalizeApiResponse } from '../utils/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/users/`)
      .then((res) => res.json())
      .then((data) => setUsers(normalizeApiResponse(data)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {error && <p className="error">{error}</p>}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} ({user.role}) - {user.email}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Users;

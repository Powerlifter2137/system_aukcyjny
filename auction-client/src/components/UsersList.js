import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserForm from './UserForm';

const UsersList = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axios.get('http://localhost:5000/api/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Błąd przy pobieraniu użytkowników:', err));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserAdded = () => {
    fetchUsers();
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error('Błąd przy usuwaniu użytkownika:', err);
    }
  };

  return (
    <div>
      <h2>Lista użytkowników</h2>
      <UserForm onUserAdded={handleUserAdded} />
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.email})
            <button onClick={() => handleDelete(user.id)} style={{ marginLeft: '10px' }}>Usuń</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersList;

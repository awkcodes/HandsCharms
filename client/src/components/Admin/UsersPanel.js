import React, { useState, useEffect } from 'react';
import styles from './AdminPanels.module.css';

const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    isSeller: false
  });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/admin/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });

      if (response.ok) {
        setShowCreateModal(false);
        fetchUsers();
        setNewUser({
          name: '',
          email: '',
          password: '',
          address: '',
          isSeller: false
        });
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <h2>Users Management</h2>
        <button onClick={() => setShowCreateModal(true)}>Create User</button>
      </div>

      {showCreateModal && (
        <div className={styles.modal}>
          <form onSubmit={handleCreateUser}>
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={e => setNewUser({...newUser, name: e.target.value})}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={e => setNewUser({...newUser, email: e.target.value})}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={e => setNewUser({...newUser, password: e.target.value})}
              required
            />
            <textarea
              placeholder="Address"
              value={newUser.address}
              onChange={e => setNewUser({...newUser, address: e.target.value})}
              required
            />
            <div className={styles.checkboxGroup}>
              <input
                type="checkbox"
                id="isSeller"
                checked={newUser.isSeller}
                onChange={e => setNewUser({...newUser, isSeller: e.target.checked})}
              />
              <label htmlFor="isSeller">Register as Seller</label>
            </div>
            <div className={styles.modalButtons}>
              <button type="submit">Create</button>
              <button type="button" onClick={() => setShowCreateModal(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Address</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.isSeller ? 'Seller' : 'User'}</td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersPanel;
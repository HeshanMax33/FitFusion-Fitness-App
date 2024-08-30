import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/user')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8080/api/user/${id}`)
      .then(response => {
        if (response.status === 200) {
          setUsers(users.filter(user => user.id !== id));
        }
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      <h2>All Users</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Address</th>
            <th>Email</th>
            <th>Age</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td><img src={`data:image/jpeg;base64,${user.image}`} alt="User" style={{width: '100px'}} /></td>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>{user.email}</td>
              <td>{user.age}</td>
              <td><button onClick={() => deleteUser(user.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;

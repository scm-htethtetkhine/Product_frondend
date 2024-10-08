import React, { useEffect, useState, useCallback } from "react";
import styles from "../components/appStyles.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchUsers = useCallback(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/user/list`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/user/delete/${id}`)
      .then(() => fetchUsers())
      .catch((err) => console.error("Error deleting user", err));
  };

  const UserRow = React.memo(({ user, index }) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button
          type="button"
          className={styles.success}
          onClick={() => navigate(`/user/edit/${user.id}`)}
        >
          Edit
        </button>
        <button
          type="button"
          className="error"
          onClick={() => handleDelete(user.id)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  const UserListTable = React.memo(({ userlist }) => (
    <div className="table-container">
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>User Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {userlist.map((user, index) => (
          <UserRow key={user.id} user={user} index={index} />
        ))}
      </tbody>
    </table>
    </div>
  ));

  return (
    <div>
      {/* <h2>User List</h2> */}
      {/* <Link to="/products/entry">
        <button className="add-btn">Add Product</button>
      </Link> */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <UserListTable userlist={users} />
      )}
    </div>
  );
}

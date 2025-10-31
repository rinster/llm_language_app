import React, { useEffect, useState } from "react";
import { listUsers, type User } from "../services/UserService";

const UsersComponents: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await listUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);


  return (
    <div className="container">
      <h2>List of Users</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Name</th>
            <th>email</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersComponents;

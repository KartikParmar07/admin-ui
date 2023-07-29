import React, { useEffect, useState } from "react";
import Rows from "./Rows";
import { userEndpoint } from "../Services/userEndpoint";
import "./Components.css";
import Pagination from "./Pagination";

const itemsPerPage = 10;
const initPage = 1;

export default function Table({ search }) {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(initPage);
  const [selectedRows, setSelectedRows] = useState([]);

  async function fetchData() {
    try {
      const response = await userEndpoint.fetchUsers();
      setUsers(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setPage(initPage);
  }, [search]);

  const handlePage = (index) => {
    if (index >= 1 && index <= totalPages) {
      setPage(index);
    }
  };

  const handleEditUser = (userId, updatedUserData) => {
    const updatedUsers = users.map((user) =>
      user.id === userId ? { ...user, ...updatedUserData } : user
    );
    setUsers(updatedUsers);
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter((user) => user.id !== userId);
    setUsers(updatedUsers);
  };

  const handleSelectRow = (userId) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(userId)) {
        return prevSelectedRows.filter((id) => id !== userId);
      } else {
        return [...prevSelectedRows, userId];
      }
    });
  };

  const handleSelectAllRows = () => {
    const displayedUserIds = filteredUsers
      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
      .map((user) => user.id);

    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.length === displayedUserIds.length) {
        return prevSelectedRows.filter((id) => !displayedUserIds.includes(id));
      } else {
        return [...prevSelectedRows, ...displayedUserIds];
      }
    });
  };

  const handleDeleteSelected = () => {
    const updatedUsers = users.filter(
      (user) => !selectedRows.includes(user.id)
    );
    setUsers(updatedUsers);
    setSelectedRows([]);
  };

  const filteredUsers = users.filter((user) => {
    if (search.trim() === "") return true;
    const searchTerm = search.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm) ||
      user.role.toLowerCase().includes(searchTerm)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  return (
    <div className="table-container">
        <div className="table-responsive">
          <table className="table table-bordered" border="1">
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={filteredUsers
                      .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                      .every((user) => selectedRows.includes(user.id))}
                    onChange={handleSelectAllRows}
                  />
                </th>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers
                .slice((page - 1) * itemsPerPage, page * itemsPerPage)
                .map((user) => (
                  <tr
                    key={user.id}
                    className={
                      selectedRows.includes(user.id) ? "selectedRows" : ""
                    }
                  >
                    <td>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedRows.includes(user.id)}
                        onChange={() => handleSelectRow(user.id)}
                      />
                    </td>
                    <Rows
                      user={user}
                      onEditUser={handleEditUser}
                      onDeleteUser={handleDeleteUser}
                    />
                  </tr>
                ))}
            </tbody>
          </table>
          {totalPages > 0 && (
            <Pagination
              totalPages={totalPages}
              currentPage={page}
              handlePageChange={handlePage}
            />
          )}
          {selectedRows.length > 0 && (
            <button
              className="btn btn-danger delete-all"
              onClick={handleDeleteSelected}
              style={{ marginBottom: "10px" }}
            >
              Delete Selected
            </button>
          )}
        </div>
    </div>
  );
}

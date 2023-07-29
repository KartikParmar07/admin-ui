import React, { useState } from "react";
import "./Components.css";

export default function Rows({ user, onEditUser, onDeleteUser }) {
  const { id, name: initialName, email: initialEmail, role: initialRole } = user;
  const [name, setName] = useState(initialName);
  const [email, setEmail] = useState(initialEmail);
  const [role, setRole] = useState(initialRole);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditMode(true);
  };

  const handleSave = () => {
    // Notify the Table component about the edited data
    onEditUser(id, { name, email, role });
    setIsEditMode(false);
  };

  const handleDelete = () => {
    // Notify the Table component about the deleted user
    onDeleteUser(id);
  };

  return (
    <>
      <td>{id}</td>
      {isEditMode ? (
        <>
          <td>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </td>
          <td>
            <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </td>
          <td>
            <input type="text" value={role} onChange={(e) => setRole(e.target.value)} />
          </td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{email}</td>
          <td>{role}</td>
        </>
      )}
      {isEditMode ? (
        <>
          <td>
            <button className="btn btn-success" onClick={handleSave}>Save</button>
          </td>
          <td>
            <button className="btn btn-danger" onClick={() => setIsEditMode(false)}>Cancel</button>
          </td>
        </>
      ) : (
        <>
          <td>
            <button className="btn btn-dark" onClick={handleEdit}>Edit</button>
          </td>
          <td>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </td>
        </>
      )}
    </>
  );
}

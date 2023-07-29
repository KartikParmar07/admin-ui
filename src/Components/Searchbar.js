import React from "react";

export default function Searchbar ({ onSearchChange }) {
  return (
    <div className="search-container">
    <div className="input-group">
  <span className="input-group-text" id="inputGroup-sizing-sm">Search</span>
  <input
        className="form-control"
        type="text"
        placeholder="Search by name, email, or role..."
        onChange={(e) => onSearchChange(e.target.value)}
      />
</div>
</div>
  );
};


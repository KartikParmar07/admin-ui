import React from "react";
import "./Components.css";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-end">
        <li className="page-item">
          <span
            className="page-link"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </span>
        </li>
        <li className="page-item">
          <span
            className="page-link"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </span>
        </li>
        {Array.from({ length: totalPages }).map((_, i) => (
          <li className={currentPage === i + 1 ? "page-item disabled" : "page-item"} key={i}>
            <span className="page-link" onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </span>
          </li>
        ))}
        <li className="page-item">
          <span
            className="page-link"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </span>
        </li>
        <li className="page-item">
          <span
            className="page-link"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;

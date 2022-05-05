import React from "react";

const Pagination = ({ currentPage, pageSize, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / pageSize); i++) {
    pageNumbers.push(i);
  }

  const getPageClasses = (number) => {
    return pageNumbers.indexOf(number) === currentPage - 1
      ? "round-effect active"
      : "round-effect";
  };

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            className={getPageClasses(number)}
            key={number}
            onClick={() => paginate(number)}
          >
            <a href="#!">{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;

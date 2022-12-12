import React from "react";

const Pagination = ({ contentPerPage, totalContent, paginate, currentPage, productperpage }) => {
  const PageNumbers = [];
  const state = {
    ActivePage: currentPage,
  };
  console.log("Pagination", contentPerPage, totalContent, paginate, currentPage, productperpage);
  const nPages = Math.ceil(totalContent / contentPerPage);
  for (let i = 1; i <= Math.ceil(totalContent / contentPerPage); i++) {
    PageNumbers.push(i);
  }
  const nextPage = () => {
    if (currentPage !== nPages) {
      paginate(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      paginate(currentPage - 1);
    }
  };

  return (
    <div className="pagination">
      <div>
        {totalContent > productperpage && currentPage != 1 ? (
          <>
            <a onClick={prevPage} href="#">
              Previous
            </a>{" "}
          </>
        ) : (
          ""
        )}
        <span>&nbsp;</span>
        {PageNumbers.map((number) => (
          <span key={number}>
            <a onClick={() => paginate(number)} href="#" className={`${state.ActivePage === number ? "active" : ""}`}>
              {number}
            </a>
          </span>
        ))}
        {totalContent > productperpage ? (
          <a onClick={nextPage} href="#">
            Next
          </a>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Pagination;

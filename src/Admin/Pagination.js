import React from "react";
import ReactPaginate from "react-paginate";

export default function PaginatedItems({
  itemsPerPage,
  pageCount,
  length,
  handleOffset,
}) {
  const handlePageClick = (event) => {
    let offset = (event.selected * itemsPerPage) % length;
    if (handleOffset) {
      handleOffset(offset);
    }
  };

  return (
    <div className="container d-flex justify-content-center">
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />
    </div>
  );
}

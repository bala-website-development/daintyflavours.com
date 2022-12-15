import { useMemo, React } from "react";

const Pagination = ({ dataPerPage, totalDataCount, paginate, currentPage }) => {
  const totalPageCount = Math.ceil(totalDataCount / dataPerPage);
  const nextPage = () => {
    if (currentPage !== totalPageCount) {
      paginate(currentPage + 1);
    }
  };
  const prevPage = () => {
    if (currentPage !== 1) {
      paginate(currentPage - 1);
    }
  };
  const state = { ActivePage: currentPage };
  const siblingCount = 1;
  const DOTS = "...";
  const range = (start, end) => {
    let length = end - start + 1;
    return Array.from({ length }, (_, idx) => idx + start);
  };
  const paginationRange = useMemo(() => {
    const totalPageNumbers = 10;
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
  }, [totalDataCount, dataPerPage, siblingCount, currentPage]);

  return (
    <div className="pagination">
      <div>
        {totalDataCount > dataPerPage && currentPage != 1 ? (
          <a onClick={prevPage} href="#">
            Previous
          </a>
        ) : (
          ""
        )}
        <span>&nbsp;</span>
        {paginationRange?.map((number) => {
          if (number === DOTS) {
            return <a>&#8230;</a>;
          }
          return (
            <a onClick={() => paginate(number)} href="#" className={`${state.ActivePage === number ? "active" : ""}`}>
              {number}
            </a>
          );
        })}
        <span>&nbsp;</span>
        {totalDataCount > dataPerPage && currentPage != totalPageCount ? (
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

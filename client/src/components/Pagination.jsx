import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../redux/actions/actions";

function Pagination() {
  const dispatch = useDispatch();

  const { countProducts, filters } = useSelector((state) => state);
  const { page } = filters;

  const totalPages = Math.ceil(countProducts / 8);
  console.log("SOY TOTAL PAGES:", totalPages);

  const handlePrevPage = () => {
    if (page > 1) dispatch(setFilters({ ...filters, page: page - 1 }));
  };

  const handleNextPage = () => {
    if (page < totalPages) dispatch(setFilters({ ...filters, page: page + 1 }));
  };

  return totalPages > 1 ? (
    <div>
      <div>
      <button onClick={handlePrevPage}>Prev</button>
      </div>
      <div>
      <span>
        Page {page} of {totalPages}
      </span>
      </div>
    <div>
      <button onClick={handleNextPage}>Next</button> 
      </div>
    </div>
  ) : (
    <div>{console.log(totalPages)}</div>
  );
}
export default Pagination;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../redux/actions/actions";

function Pagination() {
  const dispatch = useDispatch();

  const { countProducts, filters } = useSelector((state) => state);
  const { page } = filters;

  const totalPages = Math.ceil(countProducts / 8);
  

  const handlePrevPage = () => {
    if (page > 1) dispatch(setFilters({ ...filters, page: page - 1 }));
  };

  const handleNextPage = () => {
    if (page < totalPages) dispatch(setFilters({ ...filters, page: page + 1 }));
  };

  return totalPages > 1 ? (
    <div className="mt-4 flex justify-center items-center ">
      <div >
      <button onClick={handlePrevPage} className="mx-1 px-2 py-1 rounded  bg-blue-500 text-white" >Prev</button>
      </div>
      <div>
      <span >
        Page {page} of {totalPages}
      </span>
      </div>
    <div>
      <button onClick={handleNextPage} className="mx-1 px-2 py-1 rounded  bg-blue-500 text-white">Next</button> 
      </div>
    </div>
  ) : (
    <div></div>
  );
}
export default Pagination;

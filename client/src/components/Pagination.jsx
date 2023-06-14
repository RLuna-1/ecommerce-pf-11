import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../redux/actions/actions";
import styles from '../css/Pagination.module.css';

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
    <div className={styles.General}>
      <button onClick={handlePrevPage} className={styles.BotonNavegacion}>Atras</button>
      <span>
        Pagina {page} - {totalPages}
      </span>
      <button onClick={handleNextPage} className={styles.BotonNavegacion}>Siguiente</button> 
    </div>
  ) : (
    <div></div>
  );
}
export default Pagination;

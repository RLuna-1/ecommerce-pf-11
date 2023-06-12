import React, {useContext} from "react";
import styles from "../css/SearchBar.module.css";


import { SearchContext } from "../redux/context/SearchContext";


const SearchBar = ({ className }) => {

  const { searchInput, handleSearchInputChange } =
  useContext(SearchContext);

  return (
    <div className={styles.searchBarContainer}>
      <input
        className={className}
        type="text"
        placeholder="Search..."
        onChange={handleSearchInputChange}
        value={searchInput}
      ></input>
    </div>
  );
};
export default SearchBar;

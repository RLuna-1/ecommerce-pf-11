import React, {useContext} from "react";
//import styles from "../css/SearchBar.module.css";


import { SearchContext } from "../redux/context/SearchContext";


const SearchBar = ({ className }) => {

  const { searchInput, handleSearchInputChange } =
  useContext(SearchContext);

 return (
		<div
			className={` mx-auto py-4 rounded-lg min-h-[3rem]`}>
			<input
				className={`w-full p-2 border rounded-md`}
				type='text'
				placeholder='Search...'
				onChange={handleSearchInputChange}
				value={searchInput}
			/>
		</div>
 );
};
export default SearchBar;

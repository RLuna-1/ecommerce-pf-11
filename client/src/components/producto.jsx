import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../redux/actions/actions";
import styles from "../css/Producto.module.css";

const Producto = ({ id, name, description, image, price, deleted, platforms, licenses, categories }) => {

  const dispatch = useDispatch();

  const addToCart = (id) => {
    dispatch(actions.addToCarta(id));
  };

  // const agregarAlWishlist = (id) => {
  //     dispatch(actions.addToWishlist(id));
  // };

  const renderArray = (array) => {
    if (!array || !Array.isArray(array)) {
      return "";
    }
    return array.join(", ");
  };

  const renderCategories = (categories) => {
    if (categories && categories.length > 0) {
      return categories.map((category) => category.name);
    }
    
    return [];
  };

  //  return (
  //    <div className={styles.Producto}>
  //      <div>
  //     <Link to={`/detail/${id}`}>
	// 				<button>
	// 					<img src={image} alt='Imagen del producto' />
	// 				</button>
	// 			</Link>
  //       <div>
  //         <p>{name}</p>
  //         <p>{renderCategories(categories).join(", ")}</p>
  //         <p>{renderArray(platforms)}</p>
  //         <p>{renderArray(licenses)}</p>   
  //         <p>{price}</p>
  //         <div className="flex items-center justify-between">
  //           <span className="text-3xl font-bold text-gray-900 dark:text-white">$ {price}</span>
  //           <a href="#" onClick={() => addToCart(id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
  //       </div>
  //       </div>
  //     </div> 
  //    </div>

    return (
      <div className="w-full max-w-sm bg-#1F2937 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <Link to={`/detail/${id}`}>
	 				<button>
 					<img className="p-8 rounded-t-lg" src={image} alt='Imagen del producto' />
	 				</button>
	 			</Link>
          <div className="px-5 pb-5">
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{name}</h5>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Categoría: {renderCategories(categories).join(", ")}</h5>
            </div>
          <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">$ {price}</span>
              <a href="#" onClick={() => addToCart(id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
          </div>
      </div>
      </div>
    );

    
  // );
};

export default Producto;

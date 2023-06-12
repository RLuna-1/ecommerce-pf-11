import React from "react";
import { Link } from "react-router-dom";
import styles from "../css/Producto.module.css";

const Producto = ({ id, name, description, image, price, deleted, platforms, licenses, categories, addToCart }) => {
  const renderArray = (array) => {
    if (!array || !Array.isArray(array)) {
      return "";
    }
    return array.join(", ");
  };

  const renderCategories = (categories) => {
	if (!categories || !Array.isArray(categories)) {
	  return [];
	}
  
	return categories.map((category) => category.name);
  };

  return (
    <div className={styles.Producto}>
      <div>
      <Link to={`/detail/${id}`}>
					<button>
						<img src={image} alt='Imagen del producto' />
					</button>
				</Link>
        <div>
          <p>{name}</p>
          <p>{renderCategories(categories).join(", ")}</p>
          <p>{renderArray(platforms)}</p>
          <p>{renderArray(licenses)}</p>   
          <p>{price}</p>
          <button
					className={styles.BotonAgregar}
					onClick={() => addToCart(id)}>
					Agregar
				</button>
        </div>
      </div>
    </div>
  );
};

export default Producto;

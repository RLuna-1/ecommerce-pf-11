import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../css/Producto.module.css';

const Producto = ({ products, addToCart }) => {
	return (
		<div>
			<div className={styles.Producto} key={products.id}>
				<Link to={`/detail/${products.id}`}>
					<button>
						<img src={products.image} alt='Imagen del producto' />
					</button>
				</Link>
				<h1>{products.name}</h1>
				<h2>$ {products.price}</h2>
				<p>categotia: {products.categories[0].name}</p>
				<p>plataforma: {products.platforms[0].name}</p>
				<p>{products.description}</p>
				<button
					className={styles.BotonAgregar}
					onClick={() => addToCart(products.id)}>
					Agregar
				</button>
			</div>
		</div>
	);
};

export default Producto;

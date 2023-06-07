import React from 'react';
import styles from '../css/Producto.module.css';
import { Link } from 'react-router-dom';

const Producto = ({ products }) => {
	return (
		<div>
			<div>
				{products &&
					products.map((p) => {
						return (
							<div className={styles.General}>
								<div className={styles.Producto} key={p.id}>
									<Link to='/detail'>
										<button>
											<img
												src={p.image}
												alt='Imagen del producto'
											/>
										</button>
									</Link>
									<h1>{p.name}</h1>
									<h2>$ {p.price}</h2>
									<p>categotia: {p.categories[0].name}</p>
									<p>plataforma: {p.platforms[0].name}</p>
									<p>{p.description}</p>

									<button className={styles.BotonAgregar}>
										Agregar
									</button>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Producto;

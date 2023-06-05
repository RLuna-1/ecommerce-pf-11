import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../redux/actions/actions';

const Producto = () => {
	const products = useSelector((state) => state.allProducts);
	console.log(products);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(actions.getAllProducts());
	}, [dispatch]);
	return (
		<div>
			<div>
				{products &&
					products.map((p) => {
						return (
							<div key={p.id}>
								<p>{p.id}</p>
								<p>{p.name}</p>
								<p>{p.description}</p>
								<p>{p.quantity}</p>
								<p>{p.price}</p>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Producto;

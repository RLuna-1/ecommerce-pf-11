import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../css/FilterComponent.css';
import { filterProducts } from '../redux/actions/actions';

function FilterComponent() {
	const dispatch = useDispatch();
	const filteredProducts = useSelector((state) => state.filter);
	console.log(filteredProducts);

	const handleCheckboxChange = (product) => {
		const {
			id,
			name,
			description,
			image,
			quantity,
			price,
			deleted,
			categories,
			platforms,
			licenses,
			selected,
		} = product;

		dispatch(
			filterProducts({
				selectedProductId: id,
				selectedProductName: name,
				selectedProductDescription: description,
				selectedProductImage: image,
				selectedProductQuantity: quantity,
				selectedProductPrice: price,
				selectedProductDeleted: deleted,
				selectedProductCategories: categories,
				selectedProductPlatforms: platforms,
				selectedProductLicenses: licenses,
				selectedProductSelected: selected,
			}),
		);
	};

	useEffect(() => {
		dispatch(filterProducts());
	}, [dispatch]);

	return (
		<div className='filter-container'>
            <h1>Categorias</h1>
			<div className='products-container'>
				{filteredProducts.map((product) => (
					<div key={product.id} className='product'>
						<label>
							<input
								type='checkbox'
								checked={product.selected}
								onChange={() => handleCheckboxChange(product)}
							/>
							{product}
						</label>
					</div>
				))}
			</div>
		</div>
	);
}

export default FilterComponent;

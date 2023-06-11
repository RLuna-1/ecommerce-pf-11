import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterProducts,
	resetFilter,
	getCategoryRoute,
	getPlatformsRoute,
	getLicensesRoute,
} from '../redux/actions/actions';

// copiar y pegar todo el codigo en el componente FilterProducts.jsx

function Filter() {
	const [selectedCategories, setSelectedCategories] = useState([]);
	const [selectedPlatforms, setSelectedPlatforms] = useState([]);
	const [selectedPrices, setSelectedPrices] = useState([]);
	const [selectedLicenses, setSelectedLicenses] = useState([]);

	const dispatch = useDispatch();
	const allProducts = useSelector((state) => state.allProducts);
	const categoryRoute = useSelector((state) => state.categoryRoute);
	const platformsRoute = useSelector((state) => state.platformsRoute);
	const licensesRoute = useSelector((state) => state.licensesRoute);


	const prices = Array.from(
		new Set(allProducts.map((product) => product.price)),
	);

	const handleCategoryChange = (e) => {
		const category = e.target.value;
		const isChecked = e.target.checked;

		setSelectedCategories((prevSelectedCategories) => {
			let updatedCategories;
			if (isChecked) {
				updatedCategories = [...prevSelectedCategories, category];
			} else {
				updatedCategories = prevSelectedCategories.filter(
					(c) => c !== category,
				);
			}
			return updatedCategories;
		});
	};

	const handlePlatformChange = (e) => {
		const platform = e.target.value;
		const isChecked = e.target.checked;

		setSelectedPlatforms((prevSelectedPlatforms) => {
			let updatedPlatforms;
			if (isChecked) {
				updatedPlatforms = [...prevSelectedPlatforms, platform];
			} else {
				updatedPlatforms = prevSelectedPlatforms.filter(
					(p) => p !== platform,
				);
			}
			return updatedPlatforms;
		});
	};

	const handlePriceChange = (e) => {
		const price = parseFloat(e.target.value);
		const isChecked = e.target.checked;

		setSelectedPrices((prevSelectedPrices) => {
			let updatedPrices;
			if (isChecked) {
				updatedPrices = [...prevSelectedPrices, price];
			} else {
				updatedPrices = prevSelectedPrices.filter((p) => p !== price);
			}
			return updatedPrices;
		});
	};

	const handleLicenseChange = (e) => {
		const license = e.target.value;
		const isChecked = e.target.checked;

		setSelectedLicenses((prevSelectedLicenses) => {
			let updatedLicenses;
			if (isChecked) {
				updatedLicenses = [...prevSelectedLicenses, license];
			} else {
				updatedLicenses = prevSelectedLicenses.filter(
					(l) => l !== license,
				);
			}
			return updatedLicenses;
		});
	};

	const handleDeleteFilters = (e) => {
		e.preventDefault();
		setSelectedCategories([]);
		setSelectedPlatforms([]);
		setSelectedPrices([]);
		setSelectedLicenses([]);
		dispatch(resetFilter());
	};

	useEffect(() => {
		dispatch(
			filterProducts(
				selectedCategories,
				selectedPlatforms,
				selectedPrices,
				selectedLicenses,
			),
		);
		dispatch(getCategoryRoute());
        dispatch(getPlatformsRoute());
        dispatch(getLicensesRoute());
	}, [
		selectedCategories,
		selectedPlatforms,
		selectedPrices,
		selectedLicenses,
		dispatch,
	]);

	return (
		<div>
			<h2>Categorias</h2>
			{categoryRoute.map((category) => (
				<label key={category}>
					<input
						type='checkbox'
						value={category}
						checked={selectedCategories.includes(category)}
						onChange={handleCategoryChange}
					/>
					{category}
				</label>
			))}
			<h2>Plataformas</h2>
			{platformsRoute.map((platform) => (
				<label key={platform}>
					<input
						type='checkbox'
						value={platform}
						checked={selectedPlatforms.includes(platform)}
						onChange={handlePlatformChange}
					/>
					{platform}
				</label>
			))}
			<h2>Precios</h2>
			{prices.map((price) => (
				<label key={price}>
					<input
						type='checkbox'
						value={price}
						checked={selectedPrices.includes(price)}
						onChange={handlePriceChange}
					/>
					{price}
				</label>
			))}
			<h2>Licencias</h2>
			{licensesRoute.map((license) => (
				<label key={license}>
					<input
						type='checkbox'
						value={license}
						checked={selectedLicenses.includes(license)}
						onChange={handleLicenseChange}
					/>
					{license}
				</label>
			))}
			<div>
				<button type='button' onClick={handleDeleteFilters}>
					Eliminar Filtros
				</button>
			</div>
		</div>
	);
}

export default Filter;

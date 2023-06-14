import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, fetchCategories } from '../redux/actions/actions';
import SearchBar from './SearchBar';
import { SearchContext } from '../redux/context/SearchContext';
import '../css/index.css';
import '../css/FilterComponent.css'

function Filters() {

	const dispatch = useDispatch();
	const [showFilters, setShowFilters] = useState(false);
	const { filters } = useSelector((state) => state);
	const { products } = useSelector((state) => state);
	const { categories } = useSelector((state) => state);

	const { handleSearchInputReset } = useContext(SearchContext);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);

	const handleCategoryChange = (event) => {
		event.preventDefault();
		const selectedCategory = event.target.value;
		const updatedCategories = selectedCategory ? [selectedCategory] : [];
		dispatch(
			setFilters({ ...filters, categories: updatedCategories, page: 1 }),
		);
	};

	const [selectedPlatforms, setSelectedPlatforms] = useState([]);

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
			dispatch(
				setFilters({
					...filters,
					platforms: updatedPlatforms,
					page: 1,
				}),
			);
			return updatedPlatforms;
		});
	};

	const [selectedLicenses, setSelectedLicenses] = useState([]);

	const handleLicenseChange = (e) => {
		const license = e.target.value;
		const isChecked = e.target.checked;

		setSelectedLicenses((prevSelectedLicenses) => {
			let updatedLicenses;
			if (isChecked) {
				updatedLicenses = [...prevSelectedLicenses, license];
			} else {
				updatedLicenses = prevSelectedLicenses.filter(
					(p) => p !== license,
				);
			}
			dispatch(
				setFilters({ ...filters, licenses: updatedLicenses, page: 1 }),
			);
			return updatedLicenses;
		});
	};

	const handleOrderChange = (event) => {
		dispatch(setFilters({ ...filters, order: event.target.value }));
	};

	const handleDirectionChange = (event) => {
		dispatch(setFilters({ ...filters, direction: event.target.value }));
	};

	const handleResetClick = () => {
		const resetFilters = {
			name: '',
			categories: [],
			platforms: [],
			licenses: [],
			order: '',
			direction: '',
			page: 1,
		};
		dispatch(setFilters(resetFilters));
		handleSearchInputReset();
		document.querySelectorAll('select').forEach((select) => {
			select.selectedIndex = 0;
		});
		setSelectedPlatforms([]);
		setSelectedLicenses([]);
	};
	//despliega el componente filter
	const toggleFilters = () => {
		setShowFilters(!showFilters);
	};

	return (
		<div className='p-4'>
			<div className='flex items-center justify-between mb-4'>
				<div className='flex items-center'>
					<h1 className='text-2xl font-bold mr-2'>Filtros</h1>
					<div
						className='w-8 h-8 flex items-center justify-center bg-gray-200 cursor-pointer'
						onClick={toggleFilters}>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							fill='none'
							stroke='currentColor'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
							className={`h-4 w-4 transform ${
								showFilters ? 'rotate-180' : ''
							}`}>
							<path d='M19 9l-7 7-7-7' />
						</svg>
					</div>
				</div>
			</div>

			{showFilters && (
				<div>
					<div>
						<SearchBar />
					</div>
					<h2 className='text-lg font-bold mb-2'>Categorías</h2>
					<select
						value={filters.categories}
						onChange={handleCategoryChange}
						className='w-full p-2 border rounded mb-4'>
						<option value='' disabled>
							Categorías
						</option>
						{categories &&
							categories.map((category) => (
								<option key={category.id} value={category.name}>
									{category.name}
								</option>
							))}
					</select>

					<h2 className='text-lg font-bold mb-2'>Plataformas</h2>
					<label className='mb-2'>
						<input
							type='checkbox'
							value='windows'
							checked={selectedPlatforms.includes('windows')}
							onChange={handlePlatformChange}
							className='m-2'
						/>
						Windows
					</label>
					<label className='mb-2'>
						<input
							type='checkbox'
							value='linux'
							checked={selectedPlatforms.includes('linux')}
							onChange={handlePlatformChange}
							className='m-2'
						/>
						Linux
					</label>
					<label className='mb-2'>
						<input
							type='checkbox'
							value='macos'
							checked={selectedPlatforms.includes('macos')}
							onChange={handlePlatformChange}
							className='m-2'
						/>
						macOS
					</label>
					<label className='mb-2'>
						<input
							type='checkbox'
							value='ios'
							checked={selectedPlatforms.includes('ios')}
							onChange={handlePlatformChange}
							className='m-2'
						/>
						iOS
					</label>
					<label className='mb-2'>
						<input
							type='checkbox'
							value='web'
							checked={selectedPlatforms.includes('web')}
							onChange={handlePlatformChange}
							className='m-2'
						/>
						Web
					</label>

					<h2 className='text-lg font-bold mb-2'>Licencias</h2>
					<label className='mb-2'>
						<input
							type='checkbox'
							value='licencia de por vida'
							checked={selectedLicenses.includes(
								'licencia de por vida',
							)}
							onChange={handleLicenseChange}
							className='mr-2'
							
						/>
						Licencia de por vida
					</label>
					<label className='mb-2'>
						<input
							type='checkbox'
							value='suscripción anual'
							checked={selectedLicenses.includes(
								'suscripción anual',
							)}
							onChange={handleLicenseChange}
							className='m-2'
						/>
						Suscripción anual
					</label>
					<label className='mb-2'>
						<input
							type='checkbox'
							value='suscripción mensual'
							checked={selectedLicenses.includes(
								'suscripción mensual',
							)}
							onChange={handleLicenseChange}
							className='m-2'
						/>
						Suscripción mensual
					</label>
					<label className='mb-2'>
						<input
							type='checkbox'
							value='prueba gratuita'
							checked={selectedLicenses.includes(
								'prueba gratuita',
							)}
							onChange={handleLicenseChange}
							className='m-2'
						/>
						Prueba gratuita
					</label>
					<label className='mb-2'>
						<input
							type='checkbox'
							value='código abierto'
							checked={selectedLicenses.includes(
								'código abierto',
							)}
							onChange={handleLicenseChange}
							className='m-2'
						/>
						Código abierto
					</label>

					<h2 className='text-lg font-bold mb-2'>Ordenar</h2>
					<select
						value={filters.order}
						onChange={handleOrderChange}
						className='w-full p-2 border rounded mb-4'>
						{/* <option disabled value=''>
							Ordenar
						</option> */}
						<option value=''>Ordenar</option>
						<option value='alphabetical'>Alfabetico</option>
						<option value='price'>Precio</option>
					</select>

					<h3 className='text-lg font-bold mb-2'>Dirección</h3>
					<select
						value={filters.direction}
						onChange={handleDirectionChange}
						className='w-full p-2 border rounded mb-4'>
						{/* <option disabled value=''>
							Dirección
						</option> */}
						<option value=''>Dirección</option>
						<option value='DESC'>Descendente </option>
						<option value='ASC'>Ascendente</option>
					</select>

					<button
						onClick={handleResetClick}
						className='px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600'>
						Reset filters
					</button>
				</div>
			)}
		</div>
	);
}

export default Filters;

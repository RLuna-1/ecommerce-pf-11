import React, { useState } from 'react';
import '../css/FilterComponent.css';
import { useDispatch } from 'react-redux';
import { filterProducts, resetFilter } from '../redux/actions/actions';

function FilterByCategorie() {
	const [selectedCategories, setSelectedCategories] = useState([]);
    console.log(selectedCategories);
	const dispatch = useDispatch();

	const handleOptionChange = (e) => {
		const selectedCategory = e.target.value;
		const isChecked = e.target.checked;

		setSelectedCategories((prevSelectedCategories) => {
			let updatedCategories;
			if (isChecked) {
				updatedCategories = [
					...prevSelectedCategories,
					selectedCategory,
				];
			} else {
				updatedCategories = prevSelectedCategories.filter(
					(category) => category !== selectedCategory,
				);
			}

			if (updatedCategories.length === 0) {
				dispatch(resetFilter());
			} else {
				dispatch(filterProducts(updatedCategories));
			}

			return updatedCategories;
		});
	};

	return (
		<div className='filter-container'>
			<div className='option'>
				<h2 className='option-title'>Categorías</h2>
				<div className='suboptions'>
					<label>
						<input
							type='checkbox'
							checked={selectedCategories.includes(
								'Diseño gráfico',
							)}
							value='Diseño gráfico'
							onChange={handleOptionChange}
						/>
						Diseño gráfico
					</label>
					<label>
						<input
							type='checkbox'
							checked={selectedCategories.includes(
								'Desarrollo web',
							)}
							value='Desarrollo web'
							onChange={handleOptionChange}
						/>
						Desarrollo web
					</label>
					<label>
						<input
							type='checkbox'
							checked={selectedCategories.includes(
								'Administración de proyectos',
							)}
							value='Administración de proyectos'
							onChange={handleOptionChange}
						/>
						Administración de proyectos
					</label>
					<label>
						<input
							type='checkbox'
							checked={selectedCategories.includes(
								'Marketing y publicidad',
							)}
							value='Marketing y publicidad'
							onChange={handleOptionChange}
						/>
						Marketing y publicidad
					</label>
					<label>
						<input
							type='checkbox'
							checked={selectedCategories.includes(
								'Contabilidad y finanzas',
							)}
							value='Contabilidad y finanzas'
							onChange={handleOptionChange}
						/>
						Contabilidad y finanzas
					</label>
					<label>
						<input
							type='checkbox'
							checked={selectedCategories.includes(
								'Recursos humanos',
							)}
							value='Recursos humanos'
							onChange={handleOptionChange}
						/>
						Recursos humanos
					</label>
					<label>
						<input
							type='checkbox'
							checked={selectedCategories.includes(
								'Seguridad y antivirus',
							)}
							value='Seguridad y antivirus'
							onChange={handleOptionChange}
						/>
						Seguridad y antivirus
					</label>
					<label>
						<input
							type='checkbox'
							checked={selectedCategories.includes('Multimedia')}
							value='Multimedia'
							onChange={handleOptionChange}
						/>
						Multimedia
					</label>
				</div>
			</div>
		</div>
	);
}

export default FilterByCategorie;

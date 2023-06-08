import React, { useState } from 'react';
import '../css/FilterComponent.css';
import { useDispatch } from 'react-redux';
import {
	filterProductsByPlatform,
	resetFilter,
} from '../redux/actions/actions';

function FilterByPlataforms() {
	const [selectedPlatforms, setSelectedPlatforms] = useState([]);;
	const dispatch = useDispatch();

	const handleOptionChange = (e) => {
		const selectedPlatform = e.target.value;
		const isChecked = e.target.checked;

		setSelectedPlatforms((prevSelectedPlatforms) => {
			let updatedPlatforms;
			if (isChecked) {
				updatedPlatforms = [...prevSelectedPlatforms, selectedPlatform];
			} else {
				updatedPlatforms = prevSelectedPlatforms.filter(
					(platform) => platform !== selectedPlatform,
				);
			}

			if (updatedPlatforms.length === 0) {
				dispatch(resetFilter());
			} else {
				dispatch(filterProductsByPlatform(updatedPlatforms));
			}

			return updatedPlatforms;
		});
	};

	return (
		<div className='filter-container'>
			<div className='option'>
				<h2 className='option-title'>Plataformas</h2>
				<div className='suboptions'>
					<label>
						<input
							type='checkbox'
							checked={selectedPlatforms.includes('macOS')}
							value='macOS'
							onChange={handleOptionChange}
						/>
						macOS
					</label>
					<label>
						<input
							type='checkbox'
							checked={selectedPlatforms.includes('Linux')}
							value='Linux'
							onChange={handleOptionChange}
						/>
						Linux
					</label>
					<label>
						<input
							type='checkbox'
							checked={selectedPlatforms.includes('Windows')}
							value='Windows'
							onChange={handleOptionChange}
						/>
						Windows
					</label>
				</div>
			</div>
		</div>
	);
}

export default FilterByPlataforms;

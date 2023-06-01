/*
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getRecipeByDetail } from '../redux/actions/actions';
import styles from '../css/Detail.css';

export default function Detail() {
	const [isLoading, setIsLoading] = useState(true);

	//se asigna nombres random al destructuring y al state nombreDelEstado
	const { title, summary, image } = useSelector(
		(state) => state.nombreDelEstado,
	);

	const dispatch = useDispatch();
	const { id: idDetail } = useParams;

	useEffect(() => {
		dispatch(getRecipeByDetail(idDetail));
		setIsLoading(false);
	}, [dispatch, idDetail]);
	//remueve los caracteres de summary
	const CharacterRemover = (str) => {
		if (!str) return false;
		return str.toString().replace(/(<([^>]+)>)/gi, '');
	};

	return (
		<div>
			<main>
				{isLoading ? (
					<div className={styles.loading}></div>
				) : (
					<div>
						<header>
							<h1>{title}</h1>
						</header>
						<div>
							<img src={image} alt={title} />
						</div>
						<div>
							<p>{CharacterRemover(summary)}</p>
						</div>
						<section>
							<Link to={'/home'}>
								<button>
									<span>Back to home</span>
								</button>
							</Link>
						</section>
					</div>
				)}
			</main>
		</div>
	);
}
*/
import React, { useState } from 'react';
import styles from '../css/LandingPage.css';
export default function LandingPage() {
	const images = [
		'https://i.ytimg.com/vi/-dqwh8LoMzo/hqdefault.jpg',
		'https://i.ytimg.com/vi/qh3dYM6Keuw/hqdefault.jpg?sqp=-oaymwEiCKgBEF5IWvKriqkDFQgBFQAAAAAYASUAAMhCPQCAokN4AQ==&rs=AOn4CLASzvUxs_Z77IenPKcNqdw4AZd1kQ',
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgpxq7pCCawQX4TkeidWXdB5gRwczj7julHA4fY41bPfeWn9pVAxdc2emZPy4wcCHJHDI&usqp=CAU',
	];
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const nextImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	const previousImage = () => {
		setCurrentImageIndex(
			(prevIndex) => (prevIndex - 1 + images.length) % images.length,
		);
	};
	return (
		<main>
			<header>
				<div>
					<h1>
						Simplifique su negocio de comercio electrónico
						CodeXpress
					</h1>
				</div>
				<p>
					Descubre nuestra plataforma de comercio electrónico
					especializada en soluciones para desarrolladores. Ofrecemos
					plantillas, características y softwares prediseñados
					ajustables a tus necesidades. Personaliza los productos
					según tu criterio. Encuentra todo lo que necesitas en un
					solo lugar y lleva tu desarrollo al siguiente nivel.
				</p>
				<section>
					<h2>Encuentre soluciones </h2>
					<p>
						Ajuste sus productos segun las necesidades de sus
						clientes.
					</p>
					<h2>Esta al Tanto</h2>
					<ul>
						<li>Quié compra?</li>
						<li>Qué compra?</li>
						<li>Dónde compra?</li>
					</ul>
					<div>
						<div>
							<h3>Ver</h3>
							<p>buscar</p>
							<p>agregar</p>
						</div>
						<div>
							<h3>Comprar</h3>
							<p>Aceptar</p>
							<p>Devolver</p>
						</div>
						<div>
							<h3>Entregar</h3>
						</div>
					</div>
				</section>
			</header>
			<section>
				<button onClick={previousImage}>Previous</button>
				<img src={images[currentImageIndex]} alt='Carousel' />
				<button onClick={nextImage}>Next</button>
			</section>
			<section>
				<h1>Impulsa su crecimiento impulsado sus productos</h1>
				<div>
					<p>
						Brinde asistencia a los usuarios para que descubran y
						comprendan el significado de su producto durante cada
						etapa de su experiencia, desde aquellos que recién
						comienzan a usarlo hasta aquellos que son expertos en su
						uso.
					</p>
				</div>
			</section>
			<section>
				<h1>Realiza tus pagos facilmente con Mercado Pago</h1>
				<div>
					<p>
						Integre Mercado pago una vez para impulsar el éxito de
						sus pagos para siempre. Cree su propia experiencia de
						pago, luego rastree y gestione todo sin problemas a
						través de sus procesadores de pago.
					</p>
				</div>
				<div>
					<img
						src='https://cdn.lovesavingsgroup.com/logos/mercado-pago.png'
						alt='imagen mercado pago'
					/>
				</div>
			</section>
			<section>
				<h1>El kit completo para dirigir su empresa</h1>
				<div>
					<p>
						La solución, todo en uno para gestionar su empresas,
						adquirir productos, crear productos, crear propuestas,
						solucionar necesidades y automatizar el flujo de
						trabajo.
					</p>
				</div>
			</section>
		</main>
	);
}

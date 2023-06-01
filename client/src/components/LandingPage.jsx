import React, { useState } from 'react';
import styles from '../css/LandingPage.module.css';
import rayo from '../img/rayo-landing.png';
import cubo from '../img/cubo-landing.png'
import Slider from 'react-slick';
import Carousel1 from '../img/Carousel-1.jpg';
import Carousel2 from '../img/Carousel-2.png';
import Carousel3 from '../img/Carousel-3.png';

export default function LandingPage() {

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};

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
		<main className={styles.Main}>
			<header className={styles.Div1}>
				<div>
					<h1 className={styles.Title}>
						Simplifique su negocio de comercio electrónico
						CodeXpress
					</h1>
				</div>
				<p className={styles.TextoCentrado}>
					Descubre nuestra plataforma de comercio electrónico
					especializada en soluciones para desarrolladores. Ofrecemos
					plantillas, características y softwares prediseñados
					ajustables a tus necesidades. Personaliza los productos
					según tu criterio. Encuentra todo lo que necesitas en un
					solo lugar y lleva tu desarrollo al siguiente nivel.
				</p>
				<section className={styles.DivSection}>
					<div className={styles.Soluciones}>
						<h2>Encuentre soluciones </h2>
						<p className={styles.Texto}>
							Ajuste sus productos segun las necesidades de sus
							clientes.
						</p>
						<h2>Estar al Tanto</h2>
						<ul>
							<li>Quié compra?</li>
							<li>Qué compra?</li>
							<li>Dónde compra?</li>
						</ul>
					</div>
					<div className={styles.Camino}>
						<div className={styles.Ver}>
							<img src={rayo} alt='Img-Rayo' className={styles.ImgCamino}/>
							<h3>Ver</h3>
							<button className={styles.BotonesCamino}>Buscar</button>
							<button className={styles.BotonesCamino}>Agregar</button>
						</div>
						<div className={styles.Comprar}>
							<img src={cubo} alt='Img-Cubo' className={styles.ImgCamino}/>
							<h3>Comprar</h3>
							<button className={styles.BotonAceptar}>Aceptar</button>
							<button className={styles.BotonDevolver}>Devolver</button>
						</div>
						<div className={styles.Entregar}>
							<img src={cubo} alt='Img-Cubo' className={styles.ImgCamino}/>
							<h3>Entregar</h3>
						</div>
					</div>
				</section>
			</header>
			{/* <div className={styles.CarouselContainer}>
				<Slider {...settings}>
					<div>
					<img src={Carousel1} alt="Carousel 1" className={styles.CarouselImage}/>
					</div>
					<div>
					<img src={Carousel2} alt="Carousel 2" className={styles.CarouselImage}/>
					</div>
					<div>
					<img src={Carousel3} alt="Carousel 3" className={styles.CarouselImage}/>
					</div>
				</Slider>
				<img src={images[currentImageIndex]} alt='Carousel' className={styles.CarouselImg}/>
				<button className={styles.BotonCarousel}></button>
				<button className={styles.BotonCarousel}></button>
				<button className={styles.BotonCarousel}></button>
				<button onClick={previousImage}>Previous</button>
				<button onClick={nextImage}>Next</button>
			</div> */}
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

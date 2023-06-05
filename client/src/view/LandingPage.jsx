import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom"
import styles from '../css/LandingPage.module.css';
import rayo from '../img/rayo-landing.png';
import cubo from '../img/cubo-landing.png'
import Carousel1 from '../img/Carousel-1.jpg';
import Carousel2 from '../img/Carousel-2.png';
import Carousel3 from '../img/Carousel-3.png';
import MP from '../img/MP.png'
import Appel from '../img/Appel.png';
import MasterCard from '../img/MasterCard.png';
import CheckOn from '../img/CheckOn.jpg';
import CheckOff from '../img/CheckOff.jpg';

export default function LandingPage() {
	const images = [Carousel1, Carousel2, Carousel3];
	const [currentImageIndex, setCurrentImageIndex] = useState(0);
	const [activeButtonIndex, setActiveButtonIndex] = useState(0);

	const handleImageChange = (index) => {
		setCurrentImageIndex(index);
		setActiveButtonIndex(index);
	};

	useEffect(() => {
		const interval = setInterval(() => {
		  const newIndex = (currentImageIndex + 1) % images.length;
		  setCurrentImageIndex(newIndex);
		  setActiveButtonIndex(newIndex);
		}, 5000);
	
		return () => clearInterval(interval);
	}, [currentImageIndex, images.length]);
	
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
						<h2 className={styles.SubTitle}>Encuentre soluciones </h2>
						<p className={styles.Texto}>
							Ajuste sus productos segun las necesidades de sus
							clientes.
						</p>
						<h2 className={styles.SubTitle2}>Estar al Tanto</h2>
						<ul>
							<li>Quién compra?</li>
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
			<div className={styles.CarouselContainer}>
				<div className={styles.Carousel}>
					<img src={images[currentImageIndex]} alt="Carousel" className={styles.CarouselImage}/>
				</div>
				<div>
				<button id="btnImage1" onClick={() => handleImageChange(0)} className={activeButtonIndex === 0 ? styles.ActiveButton : styles.BotonCarousel}/>
				<button id="btnImage2" onClick={() => handleImageChange(1)} className={activeButtonIndex === 1 ? styles.ActiveButton : styles.BotonCarousel}/>
				<button id="btnImage3" onClick={() => handleImageChange(2)} className={activeButtonIndex === 2 ? styles.ActiveButton : styles.BotonCarousel}/>
				</div>
			</div>
			<section className={styles.Div1}>
				<h1 className={styles.Title}>Impulsa su crecimiento impulsado sus productos</h1>
				<div>
					<p className={styles.TextoCentrado}>
						Brinde asistencia a los usuarios para que descubran y
						comprendan el significado de su producto durante cada
						etapa de su experiencia, desde aquellos que recién
						comienzan a usarlo hasta aquellos que son expertos en su
						uso.
					</p>
				</div>
			</section>
			<section className={styles.DivSection}>
				<div className={styles.Soluciones}>
					<h1 className={styles.SubTitleMP}>Realiza tus pagos facilmente con Mercado Pago</h1>
					<p className={styles.Texto}>
						Integre Mercado pago una vez para impulsar el éxito de
						sus pagos para siempre. Cree su propia experiencia de
						pago, luego rastree y gestione todo sin problemas a
						través de sus procesadores de pago.
					</p>
				</div>
				<div className={styles.DivMP}>
					<img src={MP} alt='imagen mercado pago' className={styles.ImagenMP}/>
					<div className={styles.Pago}>
						<button className={styles.BotonPago}> + Nuevo metodo de pagos </button>
						<img src={Appel} alt='Appel' className={styles.PagoImg}/>
						<p className={styles.TextoPago}> Appel pay </p>
						<img src={CheckOn} className={styles.PagoImg} alt='*'/>
						<img src={MasterCard} alt='MasterCard' className={styles.PagoImg}/>
						<p className={styles.TextoPago}> Master Card </p>
						<img src={CheckOff} className={styles.PagoImg} alt='*'/>
					</div>
				</div>
			</section>
			<section className={styles.DivEnd}>
				<h1 className={styles.TitleEnd}>El kit completo para dirigir su empresa</h1>
				<p className={styles.TextoEnd}>
					La solución, todo en uno para gestionar su empresas,
					adquirir productos, crear productos, crear propuestas,
					solucionar necesidades y automatizar el flujo de
					trabajo.
				</p>
				<Link to="/home"> <button className={styles.BotonEnd}> Ingrese Ahora </button></Link>
			</section>
			
		</main>
	);
}
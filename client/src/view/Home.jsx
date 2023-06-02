import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Productos from '../components/productos.jsx';
import styles from '../css/Home.module.css';
import Carousel1 from '../img/Carousel-1.jpg';
import Carousel2 from '../img/Carousel-2.png';
import Carousel3 from '../img/Carousel-3.png';

const Home = () => {
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
    <div className={styles.General}>
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
      <div className={styles.Productos}>
        <div className={styles.Producto}>
          <Link to={'/detail'}><button><img src='https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/que-es-javascript-descubre-sus-5-principales-usos.jpg' alt='Imagen del producto'/></button></Link>
          <h1>Software 1</h1>
          <h2>$ 10</h2>
          <button className={styles.BotonAgregar}>Agregar</button>
        </div>
        <div className={styles.Producto}>
          <Link to={'/detail'}><button><img src='https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/que-es-javascript-descubre-sus-5-principales-usos.jpg' alt='Imagen del producto'/></button></Link>
          <h1>Software 2</h1>
          <h2>$ 30</h2>
          <button className={styles.BotonAgregar}>Agregar</button>
        </div>
        <div className={styles.Producto}>
          <Link to={'/detail'}><button><img src='https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/que-es-javascript-descubre-sus-5-principales-usos.jpg' alt='Imagen del producto'/></button></Link>
          <h1>Software 3</h1>
          <h2>$ 20</h2>
          <button className={styles.BotonAgregar}>Agregar</button>
        </div>
        <div className={styles.Producto}>
          <Link to={'/detail'}><button><img src='https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/que-es-javascript-descubre-sus-5-principales-usos.jpg' alt='Imagen del producto'/></button></Link>
          <h1>Software 4</h1>
          <h2>$ 15</h2>
          <button className={styles.BotonAgregar}>Agregar</button>
        </div>
        <div className={styles.Producto}>
          <Link to={'/detail'}><button><img src='https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/que-es-javascript-descubre-sus-5-principales-usos.jpg' alt='Imagen del producto'/></button></Link>
          <h1>Software 5</h1>
          <h2>$ 5</h2>
          <button className={styles.BotonAgregar}>Agregar</button>
        </div>
        <div className={styles.Producto}>
          <Link to={'/detail'}><button><img src='https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/que-es-javascript-descubre-sus-5-principales-usos.jpg' alt='Imagen del producto'/></button></Link>
          <h1>Software 6</h1>
          <h2>$ 30</h2>
          <button className={styles.BotonAgregar}>Agregar</button>
        </div>
      </div>
      {/*<Productos /> */}
    </div>
  );
}

export default Home;

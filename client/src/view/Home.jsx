import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Productos from '../components/productos.jsx';
import styles from '../css/Home.module.css';
import Carousel1 from '../img/Carousel-4.png';
import Carousel2 from '../img/Carousel-5.png';
import Carousel3 from '../img/Carousel-6.png';

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
      <h1>Destacados de la semana</h1>
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
          <Link to={'/detail'}><button><img src={require('../img/img01.png')} alt='Imagen del producto'/></button></Link>
          <h1>Full Login+CRUD. VB.NET, MySQL- Nivel Avanzado</h1>
          <h2>$ 5,99</h2>
          <button className={styles.BotonAgregar}>Agregar</button>
        </div>
        <div className={styles.Producto}>
          <Link to={'/detail'}><button><img src={require('../img/img02.jpg')} alt='Imagen del producto'/></button></Link>
          <h1>C#- RJ Code Modern UI-M1</h1>
          <h2>$ 22,50</h2>
          <button className={styles.BotonAgregar}>Agregar</button>
        </div>
        <div className={styles.Producto}>
          <Link to={'/detail'}><button><img src={require('../img/img03.jpg')} alt='Imagen del producto'/></button></Link>
          <h1>VB.NET- RJ Code Modern UI-M1</h1>
          <h2>$ 22,50</h2>
          <button className={styles.BotonAgregar}>Agregar</button>
        </div>
        <div className={styles.Producto}>
          <Link to={'/detail'}><button><img src={require('../img/img04.png')} alt='Imagen del producto'/></button></Link>
          <h1>Full Login+CRUD. C#, SQL Server- Nivel Avanzado</h1>
          <h2>$ 5,99</h2>
          <button className={styles.BotonAgregar}>Agregar</button>
        </div>
        <div className={styles.Producto}>
          <Link to={'/detail'}><button><img src={require('../img/img05.png')} alt='Imagen del producto'/></button></Link>
          <h1>Full Login+CRUD -C#, SQL, Capas, POO. Nivel Intermedio</h1>
          <h2>$ 1,99</h2>
          <button className={styles.BotonAgregar}>Agregar</button>
        </div>
        <div className={styles.Producto}>
          <Link to={'/detail'}><button><img src={require('../img/img06.png')} alt='Imagen del producto'/></button></Link>
          <h1>Full Login+CRUD -VB.NET, SQL, Capas, POO-Nivel Intermedio</h1>
          <h2>$ 1,99</h2>
          <button className={styles.BotonAgregar}>Agregar</button>
        </div>
      </div>
      {/*<Productos /> */}
    </div>
  );
}

export default Home;

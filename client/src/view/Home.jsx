import React, { useState, useEffect } from 'react';
//import { Link } from 'react-router-dom';
//import Productos from '../components/productos.jsx';
import styles from '../css/Home.module.css';
import Carousel1 from '../img/Carousel-4.png';
import Carousel2 from '../img/Carousel-5.png';
import Carousel3 from '../img/Carousel-6.png';
import { Productos } from '../components/index';

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

  

  // const productos = [
  //   {
  //     id: 1,
  //     image: require('../img/img02.jpg'),
  //     title: 'C#- RJ Code Modern UI-M1',
  //     price: '$ 22,50'
  //   },
  //   {
  //     id: 2,
  //     image: require('../img/img03.jpg'),
  //     title: 'VB.NET- RJ Code Modern UI-M1',
  //     price: '$ 22,50'
  //   },
  //   {
  //     id: 3,
  //     image: require('../img/img01.png'),
  //     title: 'Full Login+CRUD. VB.NET, MySQL- Nivel Avanzado',
  //     price: '$ 5,99'
  //   },
  //   {
  //     id: 4,
  //     image: require('../img/img04.png'),
  //     title: 'Full Login+CRUD. C#, SQL Server- Nivel Avanzado',
  //     price: '$ 5,99'
  //   },
  //   {
  //     id: 5,
  //     image: require('../img/img05.png'),
  //     title: 'Full Login+CRUD -C#, SQL, Capas, POO. Nivel Intermedio',
  //     price: '$ 1,99'
  //   },
  //   {
  //     id: 6,
  //     image: require('../img/img06.png'),
  //     title: 'Full Login+CRUD -VB.NET, SQL, Capas, POO-Nivel Intermedio',
  //     price: '$ 1,99'
  //   }
  // ];

  return (
    <div>
      <div className={styles.General}>
        <h1>Destacados de la semana</h1>
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
      </div>
      <Productos />
    </div>
  );
}

export default Home;

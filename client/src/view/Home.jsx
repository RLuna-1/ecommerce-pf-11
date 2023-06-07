import React from 'react';
import { Productos, Carousel } from '../components/index';
import styles from '../css/Home.module.css'

const Home = () => {
		return () => clearInterval(interval);
	}, [currentImageIndex, images.length]);

	return (
		<div>
      <div className={styles.General}>
        <h1>Destacados de la semana</h1>
        <Carousel />
      </div>
      <Productos />
    </div>
	);
};


export default Home;

import FilterProducts from "../components/FilterProducts";
import React, { useState, useEffect } from 'react';
import { Productos, Carousel } from '../components/index';
import styles from '../css/Home.module.css'
import Pagination from '../components/Pagination';
const Home = () => {
  const [showCarousel, setShowCarousel] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCarousel = () => {
    setShowCarousel(!showCarousel);
  };

	return (
		<div>
      <div className={styles.Carousel}>
        <div className={styles.subCarousel}>
          <h1 onClick={toggleCarousel}>↓ Destacados de la semana ↓</h1>
          {showCarousel && <Carousel />}
        </div>
        <FilterProducts/>
      </div>
      <div className={styles.Productos}>
        <Productos />
      </div>
      <Pagination/>
    </div>
	);
};


export default Home;
import React from 'react';
import { Productos, Carousel } from '../components/index';
import styles from '../css/Home.module.css'
import Pagination from '../components/Pagination';
import Filters from '../components/FilterProducts';

const Home = () => {
	return (
		<div>
      <div className={styles.General}>
        {/* <h1>Destacados de la semana</h1> */}
        {/* <Carousel /> */}
        <Filters/>
      </div>
      <div className={styles.Productos}>
        <Productos />
      </div>
      <div><Pagination/></div>
    </div>
	);
};


export default Home;

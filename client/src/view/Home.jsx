import React from 'react';
import { Productos, Carousel } from '../components/index';
import styles from '../css/Home.module.css'

const Home = () => {
  return (
    <div>
      <div className={styles.General}>
        <h1>Destacados de la semana</h1>
        <Carousel />
        <Productos />
      </div>
      
    </div>
  );
}

export default Home;
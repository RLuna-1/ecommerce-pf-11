import {React, useEffect} from 'react';
import { Productos, Carousel } from '../components/index';
import styles from '../css/Home.module.css'

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
	return (
		<div>
      <div className={styles.General}>
        <h1>Destacados de la semana</h1>
        <Carousel />
      </div>
      <div className={styles.Productos}>
        <Productos />
      </div>
    </div>
	);
};


export default Home;

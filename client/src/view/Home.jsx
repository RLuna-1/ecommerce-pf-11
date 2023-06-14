import FilterProducts from "../components/FilterProducts";
import React, { useState, useEffect } from "react";
import { Productos, Carousel } from "../components/index";
import styles from "../css/Home.module.css";
import Pagination from "../components/Pagination";
const Home = () => {
  const [showCarousel, setShowCarousel] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleCarousel = () => {
    setShowCarousel(!showCarousel);
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%", position: "fixed", top:"20%", background: "rgba(0, 0, 0, 0.336)"  }}>
        <FilterProducts />
      </div>
      <div style={{ width: "90%" }}>
        <div className={styles.Carousel}>
          <div className={styles.subCarousel}>
            <h1 onClick={toggleCarousel}>↓ Destacados de la semana ↓</h1>
            {showCarousel && <Carousel />}
          </div>
        </div>
        <div className={styles.Productos}>
          <Productos />
        </div>
        <Pagination />
      </div>
    </div>
  );
};

export default Home;
    // <div>
    //   <div className={styles.Carousel}>
    //     <div className={styles.subCarousel}>
    //       <h1 onClick={toggleCarousel}>↓ Destacados de la semana ↓</h1>
    //       {showCarousel && <Carousel />}
    //     </div>
    //     <FilterProducts/>
    //   </div>
    //   <div className={styles.Productos}>
    //     <Productos />
    //   </div>
    //   <Pagination/>
    // </div>
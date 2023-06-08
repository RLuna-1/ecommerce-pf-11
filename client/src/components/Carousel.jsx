import React, { useState, useEffect } from 'react';
import styles from '../css/Carousel.module.css';
import Carousel1 from '../img/Carousel-4.png';
import Carousel2 from '../img/Carousel-5.png';
import Carousel3 from '../img/Carousel-6.png';

const Carousel = () => {
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
    );
}   

export default Carousel;
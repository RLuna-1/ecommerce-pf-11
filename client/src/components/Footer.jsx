import React from 'react';
// import styles from "../css/Footer.module.css"
//import LogoClaro from "../img/LogoClaro.png"
import LogoOscuro from '../img/LogoOscuro.png';

const Footer = () => {
	return (
		<footer className='bg-[#1c1934] pt-9 pr-20 pl-20 mr-6 flex flex-wrap justify-between bottom-0 left-0 w-screen'>
			<div className='text-center'>
				<img className='w-28 h-28' src={LogoOscuro} alt='Logo' />
			</div>
			<div className='text-left'>
				<div className='flex flex-col items-center'>
					<h2 className='text-white'>Contáctanos</h2>
				</div>
				<p className='text-gray-700'>Codexpress@ejemplo.com</p>
				<p className='text-gray-700'>Tel: 123456789</p>
			</div>
			<div className='text-left'>
				<div className='flex flex-col items-center pt-0'>
					<h2 className='text-white'>Equipo</h2>
				</div>
				<p className='text-gray-700'>Lucas Rojo - Ivan Valero</p>
				<p className='text-gray-700'>Juan Carlos - Jose Valerio</p>
				<p className='text-gray-700'>Lucas Risso - Iñaki Galindez</p>
			</div>

			<div className='w-full text-center'>
				<small className='text-white'>
					&copy;{new Date().getFullYear()} CodExpress | Todos los
					derechos reservados.
				</small>
			</div>
		</footer>
	);
};
export default Footer;

import React from 'react';
import { Link } from 'react-router-dom';

export default function Detail() {
	//se agrega para remover culaquier caracter a la descripcion
	// const removerCaracteres = (str) => {
	// 	if (!str) return false;
	// 	return str.toString().replace(/(<([^>]+)>)/gi, '');
	// };
	return (
		<main className='flex justify-center items-start min-h-screen bg-gray-100 py-16'>
			<div className='max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden flex'>
				<div className='w-1/2 overflow-hidden'>
					<div className='h-full w-full'>
						<img
							src={require('../img/img03.jpg')}
							alt='Imagen del producto'
							className='object-contain h-full w-full ml-3'
						/>
					</div>
				</div>
				<div className='w-1/2 p-8'>
					<article>
						<header>
							<h1 className='text-2xl font-bold mb-4'>
								Detalles
							</h1>
						</header>
						<section className='mb-4'>
							<h2 className='text-xl font-semibold mb-2'>
							VB.NET- RJ Code Modern UI-M1
							</h2>
						</section>
						<section className='mb-4'>
							<h2 className='text-xl font-semibold mb-2'>
								Precio
							</h2>
							<p>$ 22,50</p>
						</section>
						<section className='mb-4'>
							<h2 className='text-xl font-semibold mb-2'>
								Descripción
							</h2>
							<p className='mb-4'>
							Se implementa una gran variedad de características 
							de apariencia y funcionalidades de formulario, sus principales características son: 
							Integra múltiples temas y estilos de apariencia, permite abrir múltiples formularios secundarios en el 
							escritorio de la aplicación (Los formularios se almacenan en una lista genérica, no en el control panel como 
							se hizo en los tutoriales), poder moverlo a una nueva ventana, realizar captura de pantalla, impresión, ayuda, 
							función snap window, redimensionamiento, tamaño de borde y entre otros.
							</p>
						</section>
						<section className='mb-4'>
							<h2 className='text-xl font-semibold mb-2'>
								Categoría
							</h2>
							<p>Windows Forms</p>
						</section>
						<section>
							<Link to={'/home'}>
								<button className='bg-[#6F47EB] hover:bg-[#4c1d95] text-white font-bold py-2 px-4 rounded mt-2'>
									<span>Regresar a inicio</span>
								</button>
							</Link>
						</section>
						<Link to={'/carrito'}>
							<button className='bg-[#6F47EB] hover:bg-[#4c1d95] text-white font-bold py-2 px-4 rounded mt-2'>
								<span>Agregar al Carrito</span>
							</button>
						</Link>
					</article>
				</div>
			</div>
		</main>
	);
}

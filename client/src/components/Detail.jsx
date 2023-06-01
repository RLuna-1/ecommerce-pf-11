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
							src='https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/que-es-javascript-descubre-sus-5-principales-usos.jpg'
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
								Nombre del producto
							</h2>
						</section>
						<section className='mb-4'>
							<h2 className='text-xl font-semibold mb-2'>
								Precio
							</h2>
							<p>$ 12</p>
						</section>
						<section className='mb-4'>
							<h2 className='text-xl font-semibold mb-2'>
								Descripción
							</h2>
							<p className='mb-4'>
								Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Dolores debitis vitae nobis
								ducimus laboriosam reiciendis amet aliquid
								accusantium in dolore! Repellat perferendis
								voluptatibus quis officia veritatis est
								explicabo debitis doloribus? Ad inventore in
								impedit provident. Eum porro delectus odit
								officia minima asperiores soluta qui numquam
								possimus, sint aliquam repudiandae molestiae at?
								Dolore voluptate ipsam recusandae repellat ab,
								cumque distinctio debitis. Neque dolore nam
								perspiciatis amet sit
							</p>
						</section>
						<section className='mb-4'>
							<h2 className='text-xl font-semibold mb-2'>
								Categoría
							</h2>
							<p>nombre de la categoría</p>
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

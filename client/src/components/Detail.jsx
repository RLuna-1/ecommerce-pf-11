import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Detail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  
  const url = `http://localhost:3001/products/${id}`;


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(url);
        setProduct(response.data);
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);
 
  return (
    <main className='flex justify-center items-start min-h-screen bg-gray-100 py-16'>
      <div className='max-w-5xl mx-auto bg-white shadow-md rounded-lg overflow-hidden flex'>
        <div className='w-1/2 overflow-hidden'>
          <div className='h-full w-full'>
            <img
              src={product?.image}
              alt='Imagen del producto'
              className='object-contain h-full w-full ml-3'
            />
          </div>
        </div>
        <div className='w-1/2 p-8'>
          {product ? (
            <article>
              <header>
                <h1 className='text-2xl font-bold mb-4'>Detalles</h1>
              </header>
              <section className='mb-4'>
                <h2 className='text-xl font-semibold mb-2'>{product.name}</h2>
              </section>
              <section className='mb-4'>
                <h2 className='text-xl font-semibold mb-2'>Precio</h2>
                <p>${product.price}</p>
              </section>
              <section className='mb-4'>
                <h2 className='text-xl font-semibold mb-2'>Descripción</h2>
                <p className='mb-4'>{product.description}</p>
              </section>
              <section className='mb-4'>
                <h2 className='text-xl font-semibold mb-2'>Categoría</h2>
                <p>{product.categoria}</p>
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
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </main>
  );
}
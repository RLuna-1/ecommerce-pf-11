import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Detail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.log('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);
 
  return (
    <main>
      <div style={{ display: "flex" }}>

        <div style={{ Width:"100%", border: "1px solid #000", padding: "10px" }}>
          <div>
            <div>
              <img
                src={product?.image}
                alt='Imagen del producto'
                style={{ maxWidth: "50%", maxHeight: "100%" }}
              />
            </div>
          </div>
        </div>
        
        <div style={{ flex: "60%" }}>
          {product ? (
            <article>
              <header>
                <h1>Detalles</h1>
              </header>
              <section>
                <h2>{product.name}</h2>
              </section>
              <section>
                <h2>Precio</h2>
                <p>${product.price}</p>
              </section>
              <section>
                <h2>Descripción</h2>
                <p>{product.description}</p>
              </section>
              <section>
                <h2>Categoría</h2>
                <p>{product.categoria}</p>
              </section>
              <section>
                <Link to={'/home'}>
                  <button>
                    <span>Regresar a inicio</span>
                  </button>
                </Link>
              </section>
              <Link to={'/carrito'}>
                <button>
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

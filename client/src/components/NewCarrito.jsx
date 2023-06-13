import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  remove1FromCart,
  removeFromCart,
  sume1FromCart,
} from "../redux/actions/actions";
import { Link } from "react-router-dom";
import * as actions from "../redux/actions/actions";



function NewCarrito() {
  const [quantity1, setQuantity1] = useState(2);
  const [quantity2, setQuantity2] = useState(2);

  const handleQuantityChange1 = (event) => {
    setQuantity1(event.target.value);
  };

  const handleQuantityChange2 = (event) => {
    setQuantity2(event.target.value);
  };

/******************* */

  const cart = useSelector((state) => state.cart);
  const price = cart
  .map((ele) => ele.price * ele.quantity)
  .reduce(function (acumulador, elemento) {
    return acumulador + elemento;
  }, 0);
  console.log(cart);
  /*****se agrega para calcular el total de cantidades */
  const totalQuantity = cart.reduce((accumulator, item) => accumulator + item.quantity, 0);
  /************ */
const dispatch = useDispatch();

useEffect(() => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    dispatch(actions.setCart(JSON.parse(savedCart)));
  }
}, [dispatch]);


const [mostrarFormulario, setMostrarFormulario] = useState(false);
const [nombre, setNombre] = useState("");
const [dni, setDni] = useState("");
const [telefono, setTelefono] = useState("");
const [direccion, setDireccion] = useState("");
const [codigoPostal, setCodigoPostal] = useState("");
const [mensajeCompra, setMensajeCompra] = useState("");
const [mostrarBotonComprar, setMostrarBotonComprar] = useState(true);

const eliminarProducto1 = (id) => {
  dispatch(remove1FromCart(id));
};
const sumarProducto1 = (id) => {
  dispatch(sume1FromCart(id));
  console.log();
};
const eliminarProducto = (id) => {
  dispatch(removeFromCart(id));
};
useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);

const mostrarFormularioEmergente = () => {
  setMostrarFormulario(true);
  setMostrarBotonComprar(false); // Oculta el primer botón "Comprar"
};

const ocultarFormularioEmergente = () => {
  setMostrarFormulario(false);
  setMostrarBotonComprar(true); // Muestra el primer botón "Comprar" nuevamente
};

const realizarCompra = () => {
  if (
    nombre !== "" &&
    dni !== "" &&
    telefono !== "" &&
    direccion !== "" &&
    codigoPostal !== ""
  ) {
    setMensajeCompra("¡La compra se ha realizado exitosamente!");
  } else {
    setMensajeCompra("Por favor, completa todos los campos del formulario.");
  }
};

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Carro de Compra</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">

        {cart.map((producto, i) => (

          <div  key={i} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
            <img  src={producto.image} alt="product-image" className="w-full rounded-lg sm:w-40" />
            <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">{producto.name}</h2>
                <p className="mt-1 text-xs text-gray-700">$ {producto.price} Cantidad: {producto.quantity}</p>
                <p className="mt-1 text-xs text-gray-700">Subtotal: {producto.price * producto.quantity}</p>
              </div>
              <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center border-gray-100">
                  <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50" onClick={() => eliminarProducto1(producto.id)}> - </span>
                  <input
                    className="h-8 w-8 border bg-white text-center text-xs outline-none"
                    type="number"
                    value={producto.quantity}
                    min="1"
                    onChange={handleQuantityChange1}
                  />
                  <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"  onClick={() => sumarProducto1(producto.id)}> + </span>
                </div>
                <div className="flex items-center space-x-4">
                 
                  <svg onClick={() => eliminarProducto(producto.id)}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                  >
                    <path  strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          ))}




        </div>
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
      
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg ">{totalQuantity} Articulos: ${price}</p>
        
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Comprar</button>
        </div>
        
      </div>    
      
      
      <button  className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6  rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600 pr-5">
        <Link to={`/home`}>
          Mas Productos
          </Link>
      </button>
    </div>
  );
}

export default NewCarrito;
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../redux/actions/actions";
import Swal from "sweetalert2";
import Windows from "../img/IconoWindows.png";
import Linux from "../img/IconoLinux.png";
import macOS from "../img/IconoMacOS.png";
import iOS from "../img/IconoIOS.png";
import Android from "../img/IconoAndroid.png";
import Web from "../img/IconoWeb.png";

function Producto({ id, name, image, price, licenses, platforms, categories }) {
  const dispatch = useDispatch();
  const addToCart = (id) => {
    try {
      dispatch(actions.setCart(id));
      Swal.fire({
        text: "Se ha agregado el producto",
        icon: "success",
        timer: 1100,
      });
    } catch (error) {
      Swal.fire({
        text: "Error al agregar el producto",
        icon: "warning",
        timer: 2000,
      });
      throw error;
    }
  };

  return (
    <div className="grid grid-cols-4 items-center bg-gray-100 border border-gray-200 rounded-lg shadow mt-2 h-58">
      <div className="col-span-1 max-w-full max-h-full m-2">
        <div className="max-w-full max-h-full">
          <Link to={`/detail/${id}`}>
            <img className="w-60 h-36 " src={image} alt="" />
          </Link>
        </div>
      </div>
      <div className="col-span-3 flex flex-col justify-between ml-2 mt-2">
        <div>
          <div class="flex flex-row justify-between">
            <Link to={`/detail/${id}`}>
              <h5 className="text-xl font-semibold tracking-tight text-gray-900">
                {name}
              </h5>
            </Link>
            <div class="flex flex-row mr-5">
              {platforms.includes("windows") && (
                <img src={Windows} alt="Windows" class="w-10 h-10" />
              )}
              {platforms.includes("linux") && (
                <img src={Linux} alt="Linux" class="w-10 h-10 ml-4" />
              )}
              {platforms.includes("macos") && (
                <img src={macOS} alt="macOS" class="w-10 h-10 ml-4" />
              )}
              {platforms.includes("ios") && (
                <img src={iOS} alt="iOS" class="w-12 h-10 ml-4" />
              )}
              {platforms.includes("android") && (
                <img src={Android} alt="Android" class="w-10 h-10 ml-4" />
              )}
              {platforms.includes("web") && (
                <img src={Web} alt="Web" class="w-10 h-10 ml-4" />
              )}
            </div>
          </div>
          <div className="mt-2">
            <h5 className="text-lg text-gray-700">
              Categoría: {categories.map((c) => c.name)}
            </h5>
          </div>
        </div>
        <div className="flex items-center justify-between mt-0">
          <span className="text-2xl font-bold text-gray-900">$ {price}</span>
          <div
            className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 transition-colors duration-300 mr-5"
            onClick={() => addToCart(id)}
          >
            Agregar al Carrito
          </div>
        </div>
      </div>
    </div>
  );
}
export default Producto;

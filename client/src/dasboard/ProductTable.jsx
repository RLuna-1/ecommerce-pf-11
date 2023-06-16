import React, { useEffect, useState } from "react";
import axios from "axios";
import FormNewProduct from "../components/FormNewProduc";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, editProduct, fetchCategories, fetchProducts, setFilters } from "../redux/actions/actions";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const ProductTable = () => {

  const { categories, products, filters } = useSelector((state) => state);
  
  const dispatch = useDispatch();
  
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

///////////////////////////////////////////////////////
useEffect(() => {
  dispatch(fetchProducts(filters));
}, [dispatch, filters]);
useEffect(() => {
  dispatch(fetchCategories());
}, [dispatch]);
// useEffect(() => {
//   dispatch(editProduct(editForm, editForm.id));
// }, [dispatch]);

///////////////////////////////

  const [editForm, setEditForm] = useState({
    id:'',
    name: '',
		description: '',
		image: '',
		quantity: '',
		price: '',
		categories: [],
		platforms: [],
		licenses: [],
  });
  const [addForm, setAddForm] = useState({
    name: "",
    category: "",
    precio: 0,
    disponible: false,
  });

  const filteredData = products.filter((product) => {
    return (
      (product.name.toLowerCase().includes(filter.toLowerCase()) ||
        product.precio.toString().includes(filter.toLowerCase())) &&
      (categoryFilter === "" || product.category === categoryFilter)
    );
  });


  const handleEdit = (product) => {
    console.log(product);
    console.log(product.id);
    setSelectedProduct(product);
    console.log(product);
    //console.log('a ver '+ product);

    setEditForm({
      
    id:product.id,
    name: product.name,
		description: product.description,
		image:product.image,
		quantity: product.quantity,
		price: product.price,
		//categories: product.categories.map(category=>category.name),
		platforms:product.platforms,
		licenses:product.licenses,
    });

    console.log(editForm);
    setEditModalOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleEditFormSubmit = async (e) => {
    console.log('esto es editForm' + {editForm});
    console.log('esto es setEditForm' +setEditForm);
    e.preventDefault();
    dispatch(editProduct(editForm, editForm.id))
    

  
    console.log("Guardar cambios para el producto:", selectedProduct);
    console.log("Valores actualizados:", editForm);
    
    setEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // Lógica para confirmar la eliminación del producto
    const { id } = selectedProduct;
    dispatch(deleteProduct(id))
    console.log("Eliminar producto:", selectedProduct);
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar el nuevo producto
    console.log("Agregar nuevo producto:", addForm);
    setAddModalOpen(false);
  };


  const handleCategoryChange = (event) => {
		event.preventDefault();
		const selectedCategory = event.target.value;
		const updatedCategories = selectedCategory ? [selectedCategory] : [];
		dispatch(
			setFilters({ ...filters, categories: updatedCategories, page: 1 }),
		);
	};

  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">

      {/* input,boton,select */}
      <div className="   flex-wrap flex justify-between items-center mb-4">
        <div className="  flex flex-wrap justify-between items-center">
          
        
           <SearchBar />

        </div>

        <div>
          <button 
            onClick={handleAdd}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            + Agregar Producto
          </button>


            <select
						
						onChange={handleCategoryChange}
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
						<option value="">Todas las categorías</option>
						
						{categories &&
							categories.map((category) => (
								<option key={category.id} value={category.name}>
									{category.name}
								</option>
							))}
					</select>

        </div>
      </div>

      
      <h2 className="p-2 font-bold mb-4">Productos</h2>
     <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Categoría</th>
            <th className="p-2 border">Precio</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((product) => (
            <tr key={product.id}>
              <td className="p-2 border">{product.id}</td>
              <td className="p-2 border">{product.name}</td>
              <td className="p-2 border">{product.categories.map(category=>category.name)}</td>
              <td className="p-2 border">{product.price}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleEdit(product)}
                  className="bg-blue-500 text-white rounded px-2 py-1 mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product)}
                  className="bg-red-500 text-white rounded px-2 py-1"
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> 
      <Pagination />
      {/* ventana de edición */}
      {editModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded  w-2/5 h-screen overflow-scroll ">
            <h2 className="text-lg font-bold mb-2">Editar producto</h2>


            <form onSubmit={handleEditFormSubmit} className='max-w-md mx-auto mt-10 mb-10'>
              <div className='mb-4'>
                <label className='block mb-2 font-sans' htmlFor="edit-name">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="edit-name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className='w-full p-2 border rounded drop-shadow-lg'
                />
              </div>
                    {/* //////imagen////// */}
              <div className='mb-4'>
                <label className='block mb-2 font-sans' htmlFor="edit-name">
                  Imagen:
                </label>
                <input
                  type="text"
                  id="edit-name"
                  value={editForm.image}
                  onChange={(e) =>
                    setEditForm({ ...editForm, image: e.target.value })
                  }
                  className='w-full p-2 border rounded drop-shadow-lg'
                />
              </div>             
            <div>
            {editForm.image.trim() && (            
                <img
                  src={editForm.image}
                  alt="Product"
                  className="w-full object-cover mx-auto mt-4"
                />
              )}
            </div>    

               {/* //////Descripcion////// */}

               <div className='mb-4'>
                <label className='block mb-2 font-sans' htmlFor="edit-name">
                  Descripcion:
                </label>
                <input
                  type="text"
                  id="edit-name"
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className='w-full p-2 border rounded drop-shadow-lg'
                />
              </div>
                    
                   {/* //////Precio////// */}

              <div className='mb-4'>
                <label className='block mb-2 font-sans' htmlFor="edit-name">
                  Precio:
                </label>
                <input
                  type="number"
                  id="edit-price"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({ ...editForm, price: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>

                {/* //////Categoría////// */}

              {/* <div className="mb-2">
                <label className="block font-bold mb-1" htmlFor="edit-category">
                  Categoría:
                </label>
                <input
                  type="text"
                  id="edit-category"
                  value={editForm.categories}
                  onChange={(e) =>
                    setEditForm({ ...editForm, categories: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>  */}

                    {/* //////Plataformas////// */}

                    <div className='mb-4'>
                <label className='block mb-2 font-sans' htmlFor="edit-name">
                Plataformas:
                </label>
                <input
                  type="text"
                  id="edit-name"
                  value={editForm.platforms}
                  onChange={(e) =>
                    setEditForm({ ...editForm, platforms: e.target.value })
                  }
                  className='w-full p-2 border rounded drop-shadow-lg'
                />
              </div>
                    

                    {/* //////Licenses////// */}


              <div className='mb-4'>
						    <label  className='block mb-2'>
                Licenses:
                </label>
                <input
                  type="text"
                  id="edit-price"
                  value={editForm.licenses}
                  onChange={(e) =>
                    setEditForm({ ...editForm, licenses: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>




              
              {/* <div className="mb-2">
                <label
                  className="block font-bold mb-1"
                  htmlFor="edit-disponible"
                >
                  Disponible:
                </label>
                <input
                  type="checkbox"
                  id="edit-disponible"
                  checked={editForm.disponible}
                  onChange={(e) =>
                    setEditForm({ ...editForm, disponible: e.target.checked })
                  }
                  className="mr-2"
                />
              </div> */}
              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-4 py-2"
              >
                Guardar cambios
              </button>
              <button
                onClick={() => setEditModalOpen(false)}
                className="bg-gray-500 text-white rounded px-4 py-2 ml-2"
              >
                Cancelar
              </button>
            </form>
            
            {/* <FormProduct2 mode="edit"/> */}

          </div>
        </div>
      )}

      {/* ventana de eliminación */}
      {deleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Eliminar producto</h2>
            <p>¿Estás seguro de que deseas eliminar este producto?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={handleDeleteConfirm}
                className="bg-red-500 text-white rounded px-4 py-2"
              >
                Eliminar
              </button>
              <button
                onClick={handleDeleteCancel}
                className="bg-gray-500 text-white rounded px-4 py-2 ml-2"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}


      
      {addModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white max-w h-screen overflow-scroll	 p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Agregar producto</h2>

            {/* <form onSubmit={handleAddFormSubmit}>
              <div className="mb-2">
                <label className="block font-bold mb-1" htmlFor="add-name">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="add-name"
                  value={addForm.name}
                  onChange={(e) =>
                    setAddForm({ ...addForm, name: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block font-bold mb-1" htmlFor="add-category">
                  Categoría:
                </label>
                <input
                  type="text"
                  id="add-category"
                  value={addForm.category}
                  onChange={(e) =>
                    setAddForm({ ...addForm, category: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block font-bold mb-1" htmlFor="add-price">
                  Precio:
                </label>
                <input
                  type="number"
                  id="add-price"
                  value={addForm.precio}
                  onChange={(e) =>
                    setAddForm({ ...addForm, precio: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label
                  className="block font-bold mb-1"
                  htmlFor="add-disponible"
                >
                  Disponible:
                </label>
                <input
                  type="checkbox"
                  id="add-disponible"
                  checked={addForm.disponible}
                  onChange={(e) =>
                    setAddForm({ ...addForm, disponible: e.target.checked })
                  }
                  className="mr-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-2 py-1 mr-2"
              >
                Agregar
              </button>
              <button
                onClick={() => setAddModalOpen(false)}
                className="bg-gray-500 text-white rounded px-4 py-2 ml-2"
              >
                Cancelar
              </button>
            </form> */}

            <FormNewProduct />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTable;

import React, { useState } from "react";

import { usuarios } from "./usuarios";/// estado global de todos los user
import Pagination from "../components/Pagination";

const UsersTable = () => {
  const [filter, setFilter] = useState("");
  const [usernameFilter, setusernameFilter] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    nombre: "",
    username: "",
    correo: '',
    telefono: '',
  });
  const [addForm, setAddForm] = useState({
    nombre: "",
    username: "",
    correo: "",
    telefono: "",
  });

  const filteredData = usuarios.filter((product) => {
    return (
      (product.nombre.toLowerCase().includes(filter.toLowerCase()) ||
        product.correo.toString().includes(filter.toLowerCase())) &&
      (usernameFilter === "" || product.username === usernameFilter)
    );
  });

  const categories = [...new Set(usuarios.map((product) => product.username))];

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditForm({
      nombre: product.nombre,
      username: product.username,
      correo: product.correo,
      telefono: product.telefono,
    });
    setEditModalOpen(true);
  };

  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  const handleAdd = () => {
    setAddModalOpen(true);
  };

  const handleEditFormSubmit = (e) => {
    e.preventDefault();
    // falta la logica para guardar los cambios del formulario de edición
    console.log("Guardar cambios para el Usuario:", selectedProduct);
    console.log("Valores actualizados:", editForm);
    setEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // falta la lgica para confirmar la eliminación del Usuario
    console.log("Eliminar Usuario:", selectedProduct);
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    // Lógica para guardar el nuevo Usuario
    console.log("Agregar nuevo Usuario:", addForm);
    setAddModalOpen(false);
  };

  return (
    <div className="antialiased bg-gray-50 dark:bg-gray-900">

      {/* input,boton,select */}
      <div className="   flex-wrap flex justify-between items-center mb-4">
        <div className="  flex flex-wrap justify-between items-center">
          
          <input
          type="text"
          
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Buscar"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        </div>

        <div>
          <button 
            onClick={handleAdd}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            + Agregar Usuario
          </button>

          {/* <select
           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500   p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

            value={usernameFilter}
            onChange={(e) => setusernameFilter(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((username) => (
              <option key={username} value={username}>
                {username}
              </option>
            ))}
          </select> */}
        </div>
      </div>
      <h2 className="p-2 font-bold mb-4">Usuarios</h2>
     <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Usernombre</th>
            <th className="p-2 border">Correo</th>
            <th className="p-2 border">Telefono</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((product) => (
            <tr key={product.id}>
              <td className="p-2 border">{product.id}</td>
              <td className="p-2 border">{product.nombre}</td>
              <td className="p-2 border">{product.username}</td>
              <td className="p-2 border">{product.correo}</td>
              <td className="p-2 border">{product.telefono}</td>
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

      

      {/* ventana de edición */}
      {editModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Editar Usuario</h2>
            <form onSubmit={handleEditFormSubmit}>
              <div className="mb-2">
                <label className="block font-bold mb-1" htmlFor="edit-nombre">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="edit-nombre"
                  value={editForm.nombre}
                  onChange={(e) =>
                    setEditForm({ ...editForm, nombre: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block font-bold mb-1" htmlFor="edit-username">
                  Username:
                </label>
                <input
                  type="text"
                  id="edit-username"
                  value={editForm.username}
                  onChange={(e) =>
                    setEditForm({ ...editForm, username: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block font-bold mb-1" htmlFor="edit-mail">
                  Correo:
                </label>
                <input
                  type="text"
                  id="edit-mail"
                  value={editForm.correo}
                  onChange={(e) =>
                    setEditForm({ ...editForm, correo: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label
                  className="block font-bold mb-1"
                  htmlFor="edit-telefono"
                >
                  Telefono:
                </label>
                <input
                  type="text"
                  id="edit-telefono"
                  value={editForm.telefono}
                  onChange={(e) =>
                    setEditForm({ ...editForm, telefono: e.target.value})
                  }
                  className="mr-2"
                />
              </div>
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
          </div>
        </div>
      )}

      {/* ventana de eliminación */}
      {deleteModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Eliminar Usuario</h2>
            <p>¿Estás seguro de que deseas eliminar este Usuario?</p>
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
          <div className="bg-white p-4 rounded">
            <h2 className="text-lg font-bold mb-2">Agregar Usuario</h2>
            <form onSubmit={handleAddFormSubmit}>
              <div className="mb-2">
                <label className="block font-bold mb-1" htmlFor="add-nombre">
                  Nombre:
                </label>
                <input
                  type="text"
                  id="add-nombre"
                  value={addForm.nombre}
                  onChange={(e) =>
                    setAddForm({ ...addForm, nombre: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block font-bold mb-1" htmlFor="add-username">
                  Username:
                </label>
                <input
                  type="text"
                  id="add-username"
                  value={addForm.username}
                  onChange={(e) =>
                    setAddForm({ ...addForm, username: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label className="block font-bold mb-1" htmlFor="add-price">
                  Correo:
                </label>
                <input
                  type="text"
                  id="add-price"
                  value={addForm.correo}
                  onChange={(e) =>
                    setAddForm({ ...addForm, correo: e.target.value })
                  }
                  className="p-2 border rounded w-full"
                />
              </div>
              <div className="mb-2">
                <label
                  className="block font-bold mb-1"
                  htmlFor="add-telefono"
                >
                  Telefono:
                </label>
                <input
                  type="text"
                  id="add-telefono"
                  value={addForm.telefono}
                  onChange={(e) =>
                    setAddForm({ ...addForm, telefono: e.target.value })
                  }
                  className="mr-2"
                />
              </div>
              <button
                type="submit"
                className="bg-green-500 text-white rounded px-4 py-2"
              >
                Agregar
              </button>
              <button
                onClick={() => setAddModalOpen(false)}
                className="bg-gray-500 text-white rounded px-4 py-2 ml-2"
              >
                Cancelar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersTable;

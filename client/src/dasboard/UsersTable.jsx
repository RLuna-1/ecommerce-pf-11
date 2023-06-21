import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser, getUsers } from "../redux/actions/actions";

const UsersTable = () => {
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const [filter, setFilter] = useState("");
  const [user_nameFilter, setUser_nameFilter] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    user_name: "",
    email: "",
    phone: "",
    admin:null,
    is_verified:null,
    disabled:null
  });

  const [addForm, setAddForm] = useState({
    name: "",
    user_name: "",
    email: "",
    phone: "",
    admin:null,
    is_verified: null,
    disabled:null
  });

  const handleEdit = (user) => {

    setSelectedProduct(user);
    setEditForm({
      name: user.name,
      last_name: user.last_name,
      user_name: user.user_name,
      phone: user.phone,
      email: user.email,
      password: user.password,
      admin:user.admin,
      is_verified:user.is_verified ,
      disabled:user.disabled,
    });
    console.log(editForm);
    setEditModalOpen(true);
  };


  const handleDelete = (user) => {
    setSelectedProduct(user);
    setDeleteModalOpen(true);
  };

  const handleAdd = () => {
    console.log(addForm);
    setAddModalOpen(true);
  };

  const handleEditFormSubmit = async (e) => {
    const {id} = selectedProduct
    e.preventDefault();
    dispatch(editUser(editForm, id))
    dispatch(getUsers())
    setEditForm({})
    setEditModalOpen(false);
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [editModalOpen])

  const handleDeleteConfirm = () => {
    // falta la lgica para confirmar la eliminación del Usuario
    setDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
  };

  const handleAddFormSubmit = (e) => {
    e.preventDefault();

    console.log("Agregar nuevo Usuario:", addForm);
   dispatch(addUser(addForm))


    setAddModalOpen(false);
  };

  const [filterText, setFilterText] = useState(""); // Texto del filtro

   // esto es un filtro para buscar por  texto ingresado
   const filteredUsers = users.filter((user) =>
   user.name.toLowerCase().includes(filterText.toLowerCase())


 );
  // funcion del cambio en el input de filtro
  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };


  return (
		<div className='antialiased bg-gray-50 dark:bg-slate-100 h-screen overflow-auto'>
			{/* input,boton,select */}
			<div className='flex-wrap flex justify-between items-center mb-4'>
				<div flex flex-wrap justify-between items-center>
					<input
						type='text'
						className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-slate-100 dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-950 dark:focus:ring-primary-500 dark:focus:border-primary-500'
						placeholder='Buscar Usuario...'
						value={filterText}
						onChange={handleFilterChange}
					/>
				</div>

				<div>
					<button
						onClick={handleAdd}
						className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
						+ Agregar Usuario
					</button>
				</div>
			</div>
			<h2 className='p-2 font-bold mb-4'>Usuarios</h2>
			<table className='w-full border-collapse'>
				<thead>
					<tr>
						<th className='p-2 border'>ID</th>
						<th className='p-2 border'>Nombre</th>
						<th className='p-2 border'>Apellido</th>
						<th className='p-2 border'>Usuario</th>
						<th className='p-2 border'>Correo</th>
						<th className='p-2 border'>Admin</th>
						<th className='p-2 border'>Verificado</th>
						<th className='p-2 border'>Deshabilitado</th>
						<th className='p-2 border'>Acciones</th>
					</tr>
				</thead>
				<tbody>
					{filteredUsers.map((user) => (
						<tr key={user.id}>
							<td className='p-2 border'>{user.id}</td>
							<td className='p-2 border'>
								{user.name}
							</td>
							<td className='p-2 border'>
								{user.last_name}
							</td>
							<td className='p-2 border'>
								{user.user_name}
							</td>
							<td className='p-2 border'>
								{user.email}
							</td>
							<td className='p-2 border'>
								{user.admin === true ? 'SI' : 'NO'}
							</td>
							<td className='p-2 border'>
								{user.is_verified === true ? 'SI' : 'NO'}
							</td>
							<td className='p-2 border'>
								{user.disabled === true ? 'SI' : 'NO'}
							</td>
							<td className='p-2 border'>
								<button
									onClick={() => handleEdit(user)}
									className='bg-blue-500 text-white rounded px-2 py-1 mr-2'>
									Editar
								</button>
								<button
									onClick={() => handleDelete(user)}
									className='bg-red-500 text-white rounded px-2 py-1'>
									Deshabilitar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			{/* ventana de edición */}
			{editModalOpen && (
				<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-white p-4 rounded w-2/5 h-screen overflow-scroll'>
						<h2 className='text-lg font-bold mb-2'>
							Editar Usuario
						</h2>
						<form
							onSubmit={handleEditFormSubmit}
							className='max-w-md mx-auto mt-10 mb-10'>
							<div className='mb-4'>
								<label
									className='block mb-2 font-sans'
									htmlFor='edit-name'>
									Nombre:
								</label>
								<input
									type='text'
									id='edit-name'
									value={editForm.name}
									onChange={(e) =>
										setEditForm({
											...editForm,
											name: e.target.value,
										})
									}
									className='w-full p-2 border rounded drop-shadow-lg'
								/>
							</div>
							<div className='mb-2'>
								<label
									className='block mb-2 font-sans'
									htmlFor='edit-user_name'>
									Usuario:
								</label>
								<input
									type='text'
									id='edit-user_name'
									value={editForm.user_name}
									onChange={(e) =>
										setEditForm({
											...editForm,
											user_name: e.target.value,
										})
									}
									className='w-full p-2 border rounded drop-shadow-lg'
								/>
							</div>
							<div className='mb-2'>
								<label
									className='block mb-2 font-sans'
									htmlFor='edit-mail'>
									Correo:
								</label>
								<input
									type='text'
									id='edit-mail'
									value={editForm.email}
									onChange={(e) =>
										setEditForm({
											...editForm,
											email: e.target.value,
										})
									}
									className='w-full p-2 border rounded drop-shadow-lg'
								/>
							</div>
							<div className='mb-2'>
								<label
									className='block mb-2 font-sans'
									htmlFor='edit-name'>
									Admin:
								</label>
								<input
									type='text'
									id='edit-phone'
									value={editForm.admin}
									onChange={(e) =>
										setEditForm({
											...editForm,
											admin: e.target.value,
										})
									}
									className='w-full p-2 border rounded drop-shadow-lg'
								/>
							</div>
							<div className='mb-2'>
								<label
									className='block mb-2 font-sans'
									htmlFor='edit-name'>
									Verificado:
								</label>
								<input
									type='text'
									id='edit-phone'
									value={editForm.is_verified}
									onChange={(e) =>
										setEditForm({
											...editForm,
											is_verified: e.target.value,
										})
									}
									className='w-full p-2 border rounded drop-shadow-lg'
								/>
							</div>
							<div className='mb-2'>
								<label
									className='block mb-2 font-sans'
									htmlFor='edit-name'>
									Deshabilitado:
								</label>
								<input
									type='text'
									id='edit-phone'
									value={editForm.disabled}
									onChange={(e) =>
										setEditForm({
											...editForm,
											disabled: e.target.value,
										})
									}
									className='w-full p-2 border rounded drop-shadow-lg'
								/>
							</div>
							<button
								type='submit'
								className='bg-blue-500 text-white rounded px-4 py-2'>
								Guardar cambios
							</button>
							<button
								onClick={() => setEditModalOpen(false)}
								className='bg-gray-500 text-white rounded px-4 py-2 ml-2'>
								Cancelar
							</button>
						</form>
					</div>
				</div>
			)}

			{/* ventana de eliminación */}
			{deleteModalOpen && (
				<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-white p-4 rounded'>
						<h2 className='text-lg font-bold mb-2'>
							Eliminar Usuario
						</h2>
						<p>
							¿Estás seguro de que deseas eliminar este Usuario?
						</p>
						<div className='flex justify-end mt-4'>
							<button
								onClick={handleDeleteConfirm}
								className='bg-red-500 text-white rounded px-4 py-2'>
								Eliminar
							</button>
							<button
								onClick={handleDeleteCancel}
								className='bg-gray-500 text-white rounded px-4 py-2 ml-2'>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			)}
			{addModalOpen && (
				<div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
					<div className='bg-white p-4 rounded'>
						<h2 className='text-lg font-bold mb-2'>
							Agregar Usuario
						</h2>
						<form onSubmit={handleAddFormSubmit}>
							<div className='mb-2'>
								<label
									className='block font-bold mb-1'
									htmlFor='add-name'>
									Nombre:
								</label>
								<input
									type='text'
									id='add-name'
									value={addForm.name}
									onChange={(e) =>
										setAddForm({
											...addForm,
											name: e.target.value,
										})
									}
									className='p-2 border rounded w-full'
								/>
							</div>
							<div className='mb-2'>
								<label
									className='block font-bold mb-1'
									htmlFor='add-user_name'>
									Usuario:
								</label>
								<input
									type='text'
									id='add-user_name'
									value={addForm.user_name}
									onChange={(e) =>
										setAddForm({
											...addForm,
											user_name: e.target.value,
										})
									}
									className='p-2 border rounded w-full'
								/>
							</div>
							<div className='mb-2'>
								<label
									className='block font-bold mb-1'
									htmlFor='add-price'>
									Correo:
								</label>
								<input
									type='text'
									id='add-price'
									value={addForm.email}
									onChange={(e) =>
										setAddForm({
											...addForm,
											email: e.target.value,
										})
									}
									className='p-2 border rounded w-full'
								/>
							</div>
							<div className='mb-2'>
								<label
									className='block font-bold mb-1'
									htmlFor='add-phone'>
									Admin:
								</label>
								<input
									type='text'
									id='add-admin'
									value={addForm.admin}
									onChange={(e) =>
										setAddForm({
											...addForm,
											admin: e.target.value,
										})
									}
									className='mr-2'
								/>
							</div>
							<button
								type='submit'
								className='bg-green-500 text-white rounded px-4 py-2'>
								Agregar
							</button>
							<button
								onClick={() => setAddModalOpen(false)}
								className='bg-gray-500 text-white rounded px-4 py-2 ml-2'>
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
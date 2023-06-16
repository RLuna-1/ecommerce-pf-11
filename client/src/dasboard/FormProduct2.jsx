import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import FormULRValidate from '../utils/FormULRValidate';
import FormValidationsShema from '../utils/FormValidationsShema';
// import {
//   addProduct,
//   editProduct,
//   deleteProduct,
//   fetchCategories,
//   setCategories,
// } from '../redux/actions/actions';
import Swal from 'sweetalert2';
import '../css/index.css';
import { addProduct, editProduct, fetchCategories, setCategories } from '../redux/actions/actions';

export default function FormProduct2({ mode, product }) {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories) || [];

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const initialValues = {
    name: '',
    description: '',
    image: '',
    quantity: '',
    price: '',
    categories: [],
    platforms: '',
    licenses: '',
  };

  useEffect(() => {
    if (mode === 'edit') {
      initialValues.name = product.name;
      initialValues.description = product.description;
      initialValues.image = product.image;
      initialValues.quantity = product.quantity;
      initialValues.price = product.price;
      initialValues.categories = product.categories;
      initialValues.platforms = product.platforms;
      initialValues.licenses = product.licenses;
    }
  }, [mode, product]);

  const onSubmit = async (values, { resetForm }) => {
    try {
      // Convert categories to an array if it's not already
      const updatedValues = {
        ...values,
        categories: Array.isArray(values.categories)
          ? values.categories
          : [values.categories],
      };

      if (mode === 'create') {
        await dispatch(addProduct(updatedValues));
        resetForm({ values: initialValues });
        Swal.fire({
          text: 'Se ha agregado el producto',
          icon: 'success',
          timer: 1100,
        });
      } else if (mode === 'edit') {
        await dispatch(editProduct(product.id, updatedValues));
        Swal.fire({
          text: 'Se ha actualizado el producto',
          icon: 'success',
          timer: 1100,
        });
      }
    } catch (error) {
      console.error('Error al agregar o actualizar el producto:', error);
      Swal.fire({
        text: 'No se ha podido completar la operación',
        icon: 'error',
        title: 'Oops...',
      });
    }
  };

  const onDelete = async () => {
    try {
      // await dispatch(deleteProduc(product.id));
      Swal.fire({
        text: 'Se ha eliminado el producto',
        icon: 'success',
        timer: 1100,
      });
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      Swal.fire({
        text: 'No se ha podido eliminar el producto',
        icon: 'error',
        title: 'Oops...',
      });
    }
  };

  useEffect(() => {
    dispatch(setCategories());
  }, [dispatch]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={FormValidationsShema}
    >
      {({ values, setFieldValue, isValid }) => (
        <Form className="max-w-md mx-auto mt-10 mb-10">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-sans">
              Titulo
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border rounded drop-shadow-lg"
            />
            <ErrorMessage
              name="name"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block mb-2">
              Imagen
            </label>
            <Field
              type="text"
              id="image"
              name="image"
              className="w-full p-2 border rounded drop-shadow-lg"
            />
            <ErrorMessage
              name="image"
              component="div"
              className="text-red-500"
            />
          </div>
          {values.image.trim() && (
            <div>
              {FormULRValidate(values).image ? (
                <div className="text-red-500">URL de imagen inválida</div>
              ) : (
                <img
                  src={values.image}
                  alt="Product"
                  className="w-full object-cover mx-auto mt-4"
                />
              )}
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="description" className="block mb-2">
              Descripción
            </label>
            <Field
              type="text"
              id="description"
              name="description"
              className="w-full p-2 border rounded drop-shadow-lg"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="quantity" className="block mb-2">
              Cantidad
            </label>
            <Field
              type="number"
              id="quantity"
              name="quantity"
              className="w-full p-2 border rounded drop-shadow-lg"
            />
            <ErrorMessage
              name="quantity"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block mb-2">
              Precio
            </label>
            <Field
              type="number"
              id="price"
              name="price"
              className="w-full p-2 border rounded drop-shadow-lg"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="categories" className="block mb-2">
              Categorías
            </label>
            {categories.length > 0 ? (
              <Field
                as="select"
                id="categories"
                name="categories"
                className="w-full p-2 border rounded drop-shadow-lg"
              >
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Field>
            ) : (
              <div>Cargando categorías...</div>
            )}
            <ErrorMessage
              name="categories"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="platforms" className="block mb-2">
              Plataformas
            </label>
            <Field
              type="text"
              id="platforms"
              name="platforms"
              className="w-full p-2 border rounded drop-shadow-lg"
            />
            <ErrorMessage
              name="platforms"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="licenses" className="block mb-2">
              Licencias
            </label>
            <Field
              type="text"
              id="licenses"
              name="licenses"
              className="w-full p-2 border rounded drop-shadow-lg"
            />
            <ErrorMessage
              name="licenses"
              component="div"
              className="text-red-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className={`${
                mode === 'edit' ? 'bg-blue-500' : 'bg-green-500'
              } hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2`}
              disabled={!isValid}
            >
              {mode === 'edit' ? 'Actualizar' : 'Agregar'}
            </button>
            {mode === 'edit' && (
              <button
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={onDelete}
              >
                Eliminar
              </button>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}

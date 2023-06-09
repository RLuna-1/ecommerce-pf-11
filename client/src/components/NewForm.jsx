import { Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../css/Formulario.module.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";



const NewForm = () => {
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    description: "",
    image: "",
    quantity: "",
    category: "",
    price: "",
  };

  const enviarForm = async (values) => {

    try {
      const response = await axios.post(
        "http://localhost:3001/products",
        values
      );
      console.log(response.data);
      Swal.fire({
        text: "Se ha agregado el producto",
        icon: "success",
        timer: 1100,
      });


    } catch (error) {
      console.error(error);
      Swal.fire({
        text: "No Se ha agregado el producto",
        icon: "error",
        title: "Oops...",

      });

    }

  };

  const { handleSubmit, handleChange, values, setFieldValue, errors } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        name: Yup.string().required("Debes ingresar un nombre"),
        description: Yup.string().required("Debes ingresar un email"),
        image: Yup.string().required("Debes ingresar un email"),
        quantity: Yup.string().required("Debes ingresar un email"),
        price: Yup.string().required("Debes ingresar un email"),
        categories: Yup.string().required("Debes ingresar un email"),
      }),

      onSubmit: enviarForm,
    });

  return (
    <div>
      <Typography color="primary" variant="h2" align="center">
        Registro de Producto
      </Typography>

      <form className={styles.FormContainer} onSubmit={handleSubmit}>
        <Grid
          container
          alignItems={"center"}
          justifyContent="space-evenly"
          spacing={2}
          sx={{ width: "70%" }}
        >
          <Grid item xs={12} md={7}>
            <TextField
              fullWidth
              id="filled-basic"
              label="Nombre"
              variant="filled"
              name="name"
              value={values.name}
              error={!!errors.name}
              helperText={errors.name}
              // se utiliza muchas en checkbox
              onChange={(e) => {
                setFieldValue("name", e.target.value);
              }}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <TextField
              fullWidth
              id="filled-basic"
              label="Descripcion"
              variant="filled"
              name="description"
              value={values.description}
              error={!!errors.description}
              helperText={errors.description}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <TextField
              fullWidth
              id="filled-basic"
              label="Precio"
              variant="filled"
              name="price"
              value={values.price}
              error={!!errors.price}
              helperText={errors.price}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12} md={7}>
            <TextField
              fullWidth
              id="filled-basic"
              label="image"
              variant="filled"
              name="image"
              value={values.image}
              error={!!errors.image}
              helperText={errors.image}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <TextField
              fullWidth
              id="filled-basic"
              label="quantity"
              variant="filled"
              name="quantity"
              value={values.quantity}
              error={!!errors.quantity}
              helperText={errors.quantity}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <TextField
              fullWidth
              id="filled-basic"
              label="categories"
              variant="filled"
              name="categories"
              value={values.categories}
              error={!!errors.categories}
              helperText={errors.categories}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default NewForm;
import { Button, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import styles from "../css/Formulario.module.css";
import { postProduct } from "../redux/actions/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

//import "./Formulario.css";

const NewForm = () => {

    const dispatch = useDispatch()
  const initialValues = {
    name: "",
    description: "",
    // image: "",
    //description: "",
   // category: "",
    price: "",
  };


  const enviarForm = (data) => {
    // data.preventDefault()
    dispatch(postProduct(data));
    //console.log(data);
//    axios.post(`http://localhost:3001/products`,data)
//    .then(res=> alert(res))
  };

  const { handleSubmit, handleChange, values, setFieldValue, errors } =
    useFormik({
      initialValues,
      validationSchema: Yup.object({
        name: Yup.string().required("Debes ingresar un nombre"),
        description: Yup.string().required("Debes ingresar un email"),
        price: Yup.string().required("Debes ingresar una contraseña"),
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

          {/* <Grid item xs={12} md={7}>
            <TextField
              fullWidth
              id="filled-basic"
              label="image"
              variant="filled"
              name="Imagen"
              value={values.image}
              error={!!errors.image}
              helperText={errors.image}
              onChange={handleChange}
            />
          </Grid> */}

        </Grid>
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default NewForm;

// import * as React from "react";
// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import { useFormik } from "formik";
// import { Button } from "@mui/material";
// import * as Yup from 'yup'

// export default function NewForm() {

//   const initialValues = {
//     name: "",
//     description: "",
//     image: "",
//     description: "",
//     category: "",
//     price: "",
//   };

//   const enviarForm = (data) => {
//     // data.preventDefault()
//     console.log(data);
//   };

//   const {handleSubmit,handleChange,values,errors, setFieldValue} = useFormik({
//     initialValues,
//     validationSchema: Yup.object({
//         name: Yup.string().required('Debes ingresar Nombre de Producto'),
//         description: Yup.string().required('Debes ingresar description de Producto'),
//         price: Yup.string().required('Debes ingresar Precio de Producto'),
//     }),
//     onSubmit: enviarForm,
//   });

//   return (
//     //   <Box
//     //     component="form"
//     //     sx={{
//     //       '& > :not(style)': { m: 1, width: '25ch' },
//     //     }}
//     //     noValidate
//     //     autoComplete="off"
//     //   >

//     //       </Box>

//     <form onSubmit={handleSubmit}>
//       <TextField
//         id="outlined-basic"
//         label="Nombre"
//         variant="outlined"
//         name="name"
//         value={values.name}
//         error={!!errors.name}
//         helperText={errors.name}
//         // se utiliza muchas en checkbox
//         onChange={(e)=>{setFieldValue("name", e.target.value)}}

//       />
//       <TextField
//         id="filled-basic"
//         label="description"
//         variant="filled"
//         name="description"
//         value={values.description}
//         error={!!errors.description}
//         helperText={errors.description}
//         onChange={handleChange}
//       />
//       <TextField
//         id="standard-basic"
//         label="Precio"
//         variant="standard"
//         name="price"
//         value={values.price}
//         error={!!errors.price}
//         helperText={errors.price}
//         onChange={handleChange}
//       />
//       <Button type="submit" variant="contained">
//         enviar
//       </Button>
//     </form>
//   );
// }

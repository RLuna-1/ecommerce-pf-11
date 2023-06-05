import React, { useState } from "react";
import styles from "../css/Carrito.module.css";

const Carrito = () => {
  const [productos, setProductos] = useState([
    {
        id: 1,
        imagen: require('../img/img01.png'),
        titulo: 'Full Login+CRUD. VB.NET, MySQL- Nivel Avanzado',
        precio: 5.99
    },
    {
        id: 2,
        imagen: require('../img/img02.jpg'),
        titulo: 'C#- RJ Code Modern UI-M1',
        precio: 22.50
    },
    {
        id: 3,
        imagen: require('../img/img03.jpg'),
        titulo: 'VB.NET- RJ Code Modern UI-M1',
        precio: 22.50
    },
    {
        id: 4,
        imagen: require('../img/img04.png'),
        titulo: 'Full Login+CRUD. C#, SQL Server- Nivel Avanzado',
        precio: 5.99
    }
  ]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [nombre, setNombre] = useState("");
  const [dni, setDni] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [mensajeCompra, setMensajeCompra] = useState("");
  const [mostrarBotonComprar, setMostrarBotonComprar] = useState(true);

  const eliminarProducto = (id) => {
    const nuevosProductos = productos.filter((producto) => producto.id !== id);
    setProductos(nuevosProductos);
  };

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
      // Realizar lógica de compra aquí (por ejemplo, enviar datos al servidor)
      setMensajeCompra("¡La compra se ha realizado exitosamente!");
    } else {
      setMensajeCompra("Por favor, completa todos los campos del formulario.");
    }
  };

  return (
    <div className={styles.General}>
      {productos.map((producto) => (
        <div key={producto.id} className={styles.Elemento}>
         <img src={producto.imagen} alt='Imagen del producto' />
                    <h1>{producto.titulo}</h1>
                    <h1>$ {producto.precio}</h1>
                    <button className={styles.BotonEliminar} onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
                </div>
            ))}

      {mostrarBotonComprar && (
        <button
          className={styles.Comprar}
          onClick={mostrarFormularioEmergente}
        >
          Comprar
        </button>
      )}

      {mostrarFormulario && (
        <div className={styles.ElementoCompra}>
          <h2>Formulario de Compra</h2>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
          />
          <input
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <input
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <input
            type="text"
            placeholder="Código Postal"
            value={codigoPostal}
            onChange={(e) => setCodigoPostal(e.target.value)}
          />
          <button className={styles.Comprar} onClick={realizarCompra}>
            Comprar
          </button>
          <button className={styles.Comprar} onClick={ocultarFormularioEmergente}>
            Cancelar
          </button>
        </div>
      )}

      {mensajeCompra && (
        <div className={styles.MensajeEmergente}>
          <p>{mensajeCompra}</p>
          <button onClick={() => setMensajeCompra("")}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default Carrito;


// import React from "react";
// import AddToBag from "../AddToBag";
// import { Link } from "react-router-dom";
// import Rating from "@mui/material/Rating";
// import { withStyles } from "@material-ui/core/styles";
// import { styled } from "@mui/material/styles";
// import Card from "@mui/material/Card";
// import CardHeader from "@mui/material/CardHeader";
// import CardMedia from "@mui/material/CardMedia";
// import CardContent from "@mui/material/CardContent";
// import CardActions from "@mui/material/CardActions";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import FavoriteIcon from "@mui/icons-material/Favorite";
// import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import { Button, CardActionArea } from "@mui/material";

// import { useSelector } from "react-redux";

// import favorites from "../redux/favorite.jsx";
// import Stock from "../Stock/Stock";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

// const Carrito = ({
//   image,
//   title,
//   id,
//   price,
//   stock,
//   discount,
//   score,
//   description,
//   bagProducts,
// }) => {
//   const [expanded, setExpanded] = React.useState(false);
//   const user = useSelector((store) => store.userReducer.currentUser);

//   const handleExpandClick = () => {
//     setExpanded(!expanded);
//   };

//   const currentUser = useSelector((state) => state.userReducer.currentUser);

//   const addFavorite = () => {
//     if (!currentUser) {
//       return console.log("You must be logged in to add to favorites");
//     }
//     favorites
//       .setFavorite(id, currentUser.userId)
//       .then((res) => {
//         console.log("The product was added to favorites");
//       })
//       .catch((err) => {
//         console.lo(err.message);
//       });
//   };

//   return (
//     <>
//       <Card sx={{ maxWidth: 355 }}>
//         {stock <= 0 && <Stock />}
//         <CardActionArea>
//           <CardHeader
//             className="txt_card"
//             title={title}
//             subheader={`NOW: $${(price * ((discount - 1) * -1)).toFixed(
//               2
//             )} BEFORE: $${price}`}
//           />
//           <CardMedia
//             component="img"
//             height="350px"
//             image={image}
//             alt="Main product image"
//           />
//           <CardContent>
//             <Typography variant="body6" color="text.primary">
//               {`STOCK: ${stock}`}
//               <br></br> {`DISCOUNT: ${discount * 100} %`}
//             </Typography>{" "}
//             <Typography variant="body2" color="textSecondary" component="p">
//               {score && <Rating name="read-only" value={score} readOnly />}
//             </Typography>
//           </CardContent>

//           <CardActions disableSpacing>
//             {stock > 0 && (
//               <IconButton aria-label="add to favorites">
//                 <AddToBag
//                   text={"Añadir al carrito"}
//                   id={id}
//                   user={user}
//                   bagProducts={bagProducts}
//                 />
//               </IconButton>
//             )}
//             <Button onClick={addFavorite} className="fav_icon">
//               <FavoriteIcon className="fav_icon" />
//             </Button>
//             <ExpandMore
//               expand={expanded}
//               onClick={handleExpandClick}
//               aria-expanded={expanded}
//               aria-label="show more"
//             >
//               <ExpandMoreIcon />
//             </ExpandMore>
//           </CardActions>
//         </CardActionArea>
//         <Collapse in={expanded} timeout="auto" unmountOnExit>
//           <CardContent>
//             <Typography className="title_info" paragraph>
//               MORE INFO:
//             </Typography>
//             <Typography className="cardInfo" paragraph>
//               {description}
//             </Typography>
//             <div>
//               <Button variant="contained" color="primary">
//                 <Link to={`/productDetail/${id}`}>Details</Link>
//               </Button>
//             </div>
//           </CardContent>
//         </Collapse>
//       </Card>
//     </>
//   );
// };

// export default withStyles({
//   title: {},
//   price: {},
// })(Carrito);
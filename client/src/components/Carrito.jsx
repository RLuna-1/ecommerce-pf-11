import React from "react";
import styles from "../css/Carrito.module.css";

const Carrito = () => {
    return (
        <div className={styles.General}>
            <div className={styles.Elemento}>
                <img src='https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/que-es-javascript-descubre-sus-5-principales-usos.jpg' alt='Imagen del producto'/>
                <h1>Software 1</h1> <h1>$ 30</h1>
                <button className={styles.BotonEliminar}>Eliminar</button>
            </div>
            <div className={styles.Elemento}>
                <img src='https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/que-es-javascript-descubre-sus-5-principales-usos.jpg' alt='Imagen del producto'/>
                <h1>Software 1</h1> <h1>$ 30</h1>
                <button className={styles.BotonEliminar}>Eliminar</button>
            </div>
            <div className={styles.Elemento}>
                <img src='https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/que-es-javascript-descubre-sus-5-principales-usos.jpg' alt='Imagen del producto'/>
                <h1>Software 1</h1> <h1>$ 30</h1>
                <button className={styles.BotonEliminar}>Eliminar</button>
            </div>
            <div className={styles.Elemento}>
                <img src='https://codersfree.nyc3.cdn.digitaloceanspaces.com/posts/que-es-javascript-descubre-sus-5-principales-usos.jpg' alt='Imagen del producto'/>
                <h1>Software 1</h1> <h1>$ 30</h1>
                <button className={styles.BotonEliminar}>Eliminar</button>
            </div>
        </div>
    )
}

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
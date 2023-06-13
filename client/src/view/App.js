import {
  Nav,
  LandingPage,
  Home,
  Footer,
  FormNewProduc,
  Detail,
  Carrito,
  SingUp,
  Producto,
  Wishlist,
} from "../components/index";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "../css/App.css";
import Login from "./Login";


// import ProductCard from "../components/ProductCard";
import { AuthProvider } from '../components/AuthContext';
import { SearchContextProvider } from "../redux/context/SearchContext";
function App() {
  const { pathname } = useLocation();

  return (
    <SearchContextProvider>
    <AuthProvider>
      {pathname !== "/login" && <Nav />}
      <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
        <Route path="/register" element={<SingUp />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/vender" element={<FormNewProduc/>} />
        <Route path="/wishlist" element={<Wishlist/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/vender" element={<FormNewProduc />} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/carrito" element={<Carrito />} />     
        <Route path="/producto" element={<Producto/>} />
        {/* <Route path="/carta" element={<ProductCard/>} /> */}
      </Routes>
      <Footer />
      </AuthProvider>
      </SearchContextProvider>
  );
}

export default App;
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
} from "../components/index";
import { Routes, Route, useLocation } from "react-router-dom";
import "../css/App.css";
import Login from "./Login";
import { AuthProvider } from "../components/AuthContext";
import NewForm from "../components/NewForm";

function App() {
  const { pathname } = useLocation();

  return (
    <AuthProvider>
      {pathname !== "/login" && <Nav />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<SingUp />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/vender" element={<NewForm/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/vender" element={<FormNewProduc />} />
        <Route path="/detail/:id" element={<Detail/>} />
        <Route path="/carrito" element={<Carrito />} />     
        <Route path="/producto" element={<Producto/>} />
      </Routes>
      <Footer />
    </AuthProvider>
  );
}

export default App;
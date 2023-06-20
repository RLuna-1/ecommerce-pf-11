import {
	Nav,
	LandingPage,
	Home,
	Footer,
	FormNewProduc,
	Detail,
	SingUp,
	Producto,
	Wishlist,
	Questions,
} from '../components/index';
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "../css/App.css";
import Login from "./Login";
import NewCarrito from "../components/NewCarrito";
import InfoCliente from "../components/InfoCliente";
import CompraCliente from "../components/CompraClinete";

// import ProductCard from "../components/ProductCard";
import { AuthProvider } from '../components/AuthContext';
import { SearchContextProvider } from "../redux/context/SearchContext";
import Admin from '../dasboard/Admin';
function App() {
  const { pathname } = useLocation();

  return (
		<SearchContextProvider>
			<AuthProvider>
				{pathname !== '/login' && pathname !== '/dashboard' && <Nav />}
				<Routes>
					<Route path='/' element={<Navigate to='/home' />} />
					<Route path='/home' element={<Home />} />
					<Route path='/register' element={<SingUp />} />
					<Route path='/landing' element={<LandingPage />} />
					<Route path='/vender' element={<FormNewProduc />} />
					<Route path='/wishlist' element={<Wishlist />} />
					<Route path='/login' element={<Login />} />
					<Route path='/vender' element={<FormNewProduc />} />
					<Route path='/detail/:id' element={<Detail />} />
					<Route path='/carrito' element={<NewCarrito />} />
					<Route path='/producto' element={<Producto />} />
					{/* <Route path="/carta" element={<ProductCard/>} /> */}
					<Route path='/infocliente' element={<InfoCliente />} />
					<Route path='/compracliente' element={<CompraCliente />} />
					<Route path='/FQA' element={<Questions />} />
					<Route path="/dashboard" element={<Admin/>}/>
				</Routes>
				{pathname !== '/dashboard' && <Footer />}
			</AuthProvider>
		</SearchContextProvider>
  );
}

export default App;
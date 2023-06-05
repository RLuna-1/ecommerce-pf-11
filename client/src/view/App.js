import {
	Nav,
	LandingPage,
	Login,
	Home,
	Footer,
	FormNewProduc,
	Detail,
	Carrito,
	Producto,
} from '../components/index';
import {Routes, Route, useLocation} from 'react-router-dom';
import '../css/App.css';

function App() {
  const {pathname} = useLocation();
  return (
		<>
			{pathname !== '/login' && <Nav />}
			<Routes>
				<Route path='/home' element={<Home />} />
				<Route path='/' element={<LandingPage />} />
				<Route path='/login' element={<Login />} />
				<Route path='/vender' element={<FormNewProduc />} />
                {/* '/detail/:id' */}
                <Route path='/detail' element={<Detail />} />
				<Route path='/carrito' element={<Carrito />} />
                {/* prueba */}
                <Route path='/producto' element={<Producto />} />
			</Routes>
			<Footer/>
		</>
  );
}

export default App;

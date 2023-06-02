import {
	Nav,
	LandingPage,
	Login,
	Home,
	Footer,
	FormNewProduc,
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
			</Routes>
			<Footer/>
		</>
  );
}

export default App;

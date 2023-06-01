import {Nav, LandingPage, Login, Home, Footer} from '../components/index'
import {Routes, Route, useLocation} from 'react-router-dom';
import '../css/App.css';

function App() {
  const {pathname} = useLocation();
  return (
    <>
      {pathname !== "/login" && <Nav />}
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        {/*<Route path="/vender" element={<Form />} />*/}
      </Routes>
      {pathname !== "/login" && <Footer/>}
    </>
  );
}

export default App;

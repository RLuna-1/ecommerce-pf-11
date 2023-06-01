import { Route, Routes } from "react-router-dom";
import {LandingPage, Nav, login} from "../components/index";
import '../css/App.css';

function App() {
  return (
    <>      
      <Nav />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/*<Route path="/home" element={<productos/>}/>*/}
        <Route path="/login" element={<login/>}/>
      </Routes>
    </>
  );
}

export default App;

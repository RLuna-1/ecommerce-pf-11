import "../css/App.css";
//import LandingPage from "../components/LandingPage";
import { Routes, Route } from "react-router-dom";
// import Detail from "../components/Detail";
// import Form from "../components/Form";
import About from "../components/About";
import Login from "../components/Login";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/" element={<LandingPage />} /> */}
        {/* <Route path="/form" element={<Form />} /> */}
        {/* <Route path="/detail" element={<Detail />} /> */}
      </Routes>
    </div>
  );
}

export default App;

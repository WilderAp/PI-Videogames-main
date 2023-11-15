import {  Routes, Route, useLocation, useNavigate } from "react-router-dom";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";
import Detail from "./Pages/DetailPage/Detail";
import Form from "./Pages/FormPage/Form";


function App() {

  return (
    <>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/detail/:id" element={<Detail/>} />
          <Route path="/form" element={<Form/>} />
          
        </Routes>
    </>
  )

}

export default App;

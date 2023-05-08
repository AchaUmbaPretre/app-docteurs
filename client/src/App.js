import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./Font-Awesome-6.x/css/all.min.css";
import AppDoctor from "./pages/appDoctor/AppDoctor";
import Notification from "./pages/notification/Notification";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appDoctor" element={<AppDoctor />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

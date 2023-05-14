import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import "./Font-Awesome-6.x/css/all.min.css";
import AppDoctor from "./pages/appDoctor/AppDoctor";
import Notification from "./pages/notification/Notification";
import Users from "./pages/admin/Users";
import Docteur from "./pages/admin/Docteur";
import Profile from "./pages/docteur/Profile";
import BookRDV from "./pages/bookRdv/BookRDV";
import Rdv from "./pages/rendezVous/Rdv";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appDoctor" element={<AppDoctor />} />
          <Route path="/notification" element={<Notification />} />
          <Route path="/admin/users" element={<Users/>} />
          <Route path="/admin/docteur" element={<Docteur/>} />
          <Route path="/docteur/profile/:id" element={<Profile/>} />
          <Route path="/docteur/book-rdv/:docteurId" element={<BookRDV/>} />
          <Route path="/rendezVous" element={<Rdv/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

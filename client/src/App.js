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
import DocteurRdv from "./pages/docteur/docteurRdv/DocteurRdv";
import { useSelector } from "react-redux";
import Spinner from "./pages/spinner/Spinner";
import { ProtectionRoute } from "./protectionRoutes/ProtectionRoutes";
import { ProtectionPublic } from "./protectionRoutes/ProtectionPublic";


function App() {
  const {loading} = useSelector(state  => state.alerts)
  return (
    <>
      <BrowserRouter>
      {loading ? <Spinner/> :
        <Routes>
          <Route path="/" element={ <ProtectionRoute><Home /></ProtectionRoute> } />
          <Route path="/appDoctor" element={<ProtectionRoute><AppDoctor /></ProtectionRoute>} />
          <Route path="/notification" element={<ProtectionRoute><Notification /></ProtectionRoute>} />
          <Route path="/admin/users" element={<ProtectionRoute><Users/></ProtectionRoute>} />
          <Route path="/admin/docteur" element={<ProtectionRoute><Docteur/></ProtectionRoute>} />
          <Route path="/docteur/profile/:id" element={<ProtectionRoute><Profile/></ProtectionRoute>} />
          <Route path="/docteur/book-rdv/:docteurId" element={<ProtectionRoute><BookRDV/></ProtectionRoute>} />
          <Route path="/rendezVous" element={<ProtectionRoute><Rdv/></ProtectionRoute>} />
          <Route path="/docteur-rendezVous" element={<ProtectionRoute><DocteurRdv/></ProtectionRoute>} />
          <Route path="/login" element={<ProtectionPublic><Login/></ProtectionPublic>} />
          <Route path="/register" element={<ProtectionPublic><Register/></ProtectionPublic>} />
        </Routes>
         }
      </BrowserRouter>
    </>
  );
}

export default App;

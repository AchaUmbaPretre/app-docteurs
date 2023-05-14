import { Badge } from 'antd'
import './layout.css'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { message } from 'antd'
import { adminMenu, userMenu } from '../../data/Data'
import users from "./../../img/user.jpg"

const Layout = ({children}) => {

    const  location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.clear()
        message.success('logout Successfully')
        navigate('/login')
    }

const docteurMenu = [
    {
        name: "Accueil",
        path: "/",
        icons: "fas fa-house layout-icon"
    },
    {
        name: "Rendez-vous",
        path: "/rendezVous",
        icons: "fas fa-list layout-icon"
    },
    {
        name: "Profile",
        path: `/docteur/profile/$/* {user?._id} */`,
        icons: "fas fa-user layout-icon"
    },
]

    /* const sideMenu = user?.isAdmin ? adminMenu : userMenu?.isDocteur ? docteurMenu : userMenu; */
  return (
    <>
        <div className="layout">
            <div className="layout-left">
                <h2 className="layout-title">App Docteur</h2>
                <hr className="layout-hr" />
                <div className="layout-bottom">
                { userMenu.map((sidenav)=>{
                    const isActive = location.pathname ===  sidenav.path
                return (
                    <div className= {`layout-items ${isActive && 'active'}`}>
                        <i className={`${sidenav.icons} ${isActive && 'active'}`}></i>
                        <Link to={sidenav.path} className= {`layout-link ${isActive && 'active'}`} >{sidenav.name}</Link>
                    </div>
                     )})}
                     <div className="layout-items" onClick={handleLogout}>
                        <i className="fas fa-right-from-bracket layout-icon"></i>
                        <Link to={"/login"} className="layout-link" >Deconnexion</Link>
                    </div>
                </div>
            </div>
            <div className="layout-right">
                <div className="layout-top">
                    <div className="layout-top-right">
                        <Badge count={5}  onClick={()=> navigate('/notification')} >
                            <i className="fas fa-bell layout-icons"></i>
                        </Badge>
                        <div className="layout-rows">
                            <img src={users} alt="" className="layout-img" />
                            <Link className="layout-admin">Admin</Link>
                        </div>
                    </div>
                </div>
                <div className="layout-right-bottom">
                    {!children && <h1>HOME</h1>}
                    <div className="layout-body">{children}</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Layout
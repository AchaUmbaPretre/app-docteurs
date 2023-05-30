import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../composants/layout/Layout";
import { Row } from "antd";
import { showLoading, hideLoading } from "../../redux/featured/alertSlide";
import DocteurList from "../../composants/docteurList/DocteurList";
import './home.css'
import { Link } from "react-router-dom";

const Home = () => {

  const [ docteur, setDocteur] = useState(null);

  const getUser = async () =>{
    try {
      showLoading(true)
      const res = await axios.get('http://localhost:8800/api/user/getAllDocteur',{
        headers:{
          Authorization : "Bearer " + localStorage.getItem('token'),
        }
      })
      if(res.data.success){
        setDocteur(res.data.data)
        hideLoading(false)
      }
      
    } catch (error) {
      console.log(error)
      hideLoading(false)
    }   
  }

  useEffect(()=>{
    getUser()
  },[])
  
  return (
    <div>
      <Layout>
        <Row>
          <div className="container-home">
            <div className="rows">
              <div className="row">
                <div className="rows-icons red">
                  <i className="fas fa-house icons-home"></i>
                </div>
                <Link className="row-span">Accueil</Link>
              </div>

              <div className="row">
                <div className="rows-icons green">
                  <i className="fas fa-list icons-home"></i>
                </div>
                <Link className="row-span">Rendez-vous</Link>
              </div>

              <div className="row">
                <div className="rows-icons bleu">
                  <i className="fas fa-user icons-home"></i>
                </div>
                <Link className="row-span">Profile</Link>
              </div>
            </div>
            <div className="home-row">
            { docteur && docteur.map(docteurs => (
                <DocteurList docteur={docteurs}/>
            ))}
            </div>
          </div>
        </Row>
      </Layout>
    </div>
  );
};

export default Home;

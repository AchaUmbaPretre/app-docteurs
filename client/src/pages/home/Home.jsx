import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "../../composants/layout/Layout";
import { Row, message } from "antd";
import DocteurList from "../../composants/docteurList/DocteurList";

const Home = () => {

  const [ docteur, setDocteur] = useState(null)

  const getUser = async () =>{
    try {
      const res = await axios.get('/api/user/getUser', {
        headers:{
          Authorization : "Bearer " + localStorage.getItem('token'),
        }
      })
      if(res.data.success){
        setDocteur(res.data.data)
      }
      
    } catch (error) {
      console.log(error)
    }   
  }

  useEffect(()=>{
    getUser()
  },[])
  
  return (
    <div>
      <Layout>
        <Row>
          <DocteurList docteur={docteur}/>
        </Row>
      </Layout>
    </div>
  );
};

export default Home;

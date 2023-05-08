import axios from "axios";
import React, { useEffect } from "react";
import Layout from "../../composants/layout/Layout";

const Home = () => {

  const getUser = async () =>{
    try {
      const res = await axios.post('/api/user/getUser', {}, {
        headers:{
          Authorization : "Bearer " + localStorage.getItem('token'),
        }
      })
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    getUser()
  },[])
  
  return (
    <div>
      <Layout/>
    </div>
  );
};

export default Home;

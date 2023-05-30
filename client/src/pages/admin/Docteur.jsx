import { useEffect, useState } from 'react'
import Layout from '../../composants/layout/Layout'
import './admin.css'
import axios from 'axios'
import { Table, message } from 'antd'

const Docteur =  () => {

  const [docteur, setDocteur] = useState([]);

  const getDocteur = async () =>{
    try {
      const res =  await axios.get('http://localhost:8800/api/admin/getAllDocteur', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      if(res.data.success){
          setDocteur(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleAccountStatus = async (record, status) =>{
    try {
      const res = await axios.post("http://localhost:8800/api/admin/changeAccountStatus",
        { docteurId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        }
      );

      if(res.data.success){
        message.success(res.data.message)
        window.location.reload()
      }
      else{
        message.error(message.data.message)
      }
      
    } catch (error) {
      console.log(error)
      
    }
  }

  useEffect(()=>{
    getDocteur();
  }, [])

  const  columns = [
    {
      title: 'Nom',
      dataIndex: 'nom',
      render: (text, record)=>(
        <span>{record.firstname} {record.lastname}</span>
      )
    },
    {
      title: 'Status',
      dataIndex: 'status'
    },
    {
      title: 'Phone',
      dataIndex: 'phone'
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record)=>(
        <div className="actions">
          {record.status === 'en attente' ? <button className="action-btn" onClick={()=> handleAccountStatus(record, "approuvée")} >Approuver</button> : 
          <button className="action-btn red" onClick={()=> handleAccountStatus(record, "rejectée")}>Rejecter</button>}
        </div>
      )
    },
  ]
  
  return (
    <>
        <Layout>
            <div className="docteur">
            <h1 className="users-h1">Liste des docteurs</h1>
               <Table columns={columns} dataSource={docteur} />
            </div>
        </Layout> 
    </>
  )
}

export default Docteur
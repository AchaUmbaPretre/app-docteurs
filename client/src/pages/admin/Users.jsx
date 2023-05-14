import { useEffect, useState } from 'react'
import Layout from '../../composants/layout/Layout'
import './admin.css'
import axios from 'axios'
import { Table } from 'antd'

const Users = () => {

   const [users, setUsers] = useState([]);

  const getUsers  = async () =>{
    try {
      const res =  await axios.get('/api/admin/getAllUsers', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
      });
      if(res.data.success){
          setUsers(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

useEffect(()=>{

  getUsers();

},[])

  const  columns = [
    {
      title: 'Nom',
      dataIndex: 'nom'
    },
    {
      title: 'Email',
      dataIndex: 'email'
    },
    {
      title: 'Docteur',
      dataIndex: 'isDocteur',
      render: (text, record)=>(
        <span>{record.isDocteur ? 'Oui' : 'Non'}</span>
      )
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      render: (text, record)=>(
        <div className="actions">
          <button className="action-btn"></button>
          <button className="action-btn"></button>
        </div>
      )
    },
  ]
  return (
    <>
        <Layout>
            <div className="users">
               <h1 className="users-h1">Liste des utilisateurs</h1>
               <Table columns={columns} dataSource={''} />
            </div>
        </Layout>
    </>
  )
}

export default Users
import { useEffect, useState } from 'react'
import Layout from '../../composants/layout/Layout'
import './rdv.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';

const Rdv = () => {
    const [rdv, setRdv] = useState();

    const getRdv = async(req, res) => {
        try {
            const res = await axios.get('/api/user/user-rdv',
            {
                headers:{
                  Authorization : "Bearer" + localStorage.getItem('token'),
                }
              }
            )
            if(res.data.success){
                setRdv(res.data.data)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

useEffect(() => {
    getRdv();

}, [])

    const columns = [
        {
            title: 'ID',
            dataIndex:'_id'
        },
        {
            title: 'Name',
            dataIndex:'name',
            render: (text, record) => (
                <span>
                    {record.docteurId.firstName} {record.docteurId.lastName}
                </span>
            )
        },
        {
            title: 'Phone',
            dataIndex:'phone',
            render: (text, record) => (
                <span>
                    {record.docteurId.phone}
                </span>
            )
        },
        {
            title: 'Date',
            dataIndex:'date',
            render: (text, record) => (
                <span>
                    {/* {moment(record.date).format("DD-MM-YYYY")} */}
                </span>
            )
        },
        {
            title: 'Heure',
            dataIndex:'time',
            render: (text, record) => (
                <span>
                    {/* { moment(record.time).format("HH:mm")} */}
                </span>
            )
        },
        {
            title: 'Status',
            dataIndex:'status'
        },
    ]

  return (
    <>
        <Layout>
            <div className="rdv">
                <h1 className='users-h1'>Liste des rendez-vous</h1>
                <Table columns={columns}/>
            </div>
        </Layout>
    </>
  )
}

export default Rdv
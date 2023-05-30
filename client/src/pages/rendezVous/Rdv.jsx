import { useEffect, useState } from 'react'
import Layout from '../../composants/layout/Layout'
import './rdv.css'
import axios from 'axios';
import { Table } from 'antd';
import moment from 'moment'

const Rdv = () => {
    const [rdv, setRdv] = useState();

    const getRdv = async() => {
        try {
            const res = await axios.get('http://localhost:8800/api/user/user-rdv',
            {
                headers:{
                  Authorization : "Bearer " + localStorage.getItem('token'),
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
    console.log(rdv)

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
                    {record.lastname}
                </span>
            )
        },
        {
            title: 'Phone',
            dataIndex:'phone',
            render: (text, record) => (
                <span>
                    {record.numero}
                </span>
            )
        },
        {
            title: 'Date',
            dataIndex:'date',
            render: (text, record) => (
                <span>
                    {moment(record.date).format("DD-MM-YYYY")}
                </span>
            )
        },
        {
            title: 'Heure',
            dataIndex:'time',
            render: (text, record) => (
                <span>
                     { moment(record.time).format("HH:mm")}
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
                <Table columns={columns}  dataSource={rdv}/>
            </div>
        </Layout>
    </>
  )
}

export default Rdv
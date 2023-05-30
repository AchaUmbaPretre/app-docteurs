import { Table, message } from 'antd'
import './docteurRdv.css'
import axios from 'axios';
import moment from 'moment';
import { useEffect, useState } from 'react';
import Layout from '../../../composants/layout/Layout';

const DocteurRdv = () => {

    const [docteurRdv, setDocteurRdv] = useState([]);

    const getDocteurRdv = async() => {
        try {
            const res = await axios.get('http://localhost:8800/api/docteur/docteur-rendezVous',
            {
                headers:{
                  Authorization : "Bearer " + localStorage.getItem('token'),
                }
              }
            )
            if(res.data.success){
                setDocteurRdv(res.data.data)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

useEffect(()=>{
    getDocteurRdv()
},[])

const handleStatus = async (record, status) =>{
    try {
        const res = await axios.post('http://localhost:8800/api/docteur/update-status', {rdvId: record._id, status},
        {
            headers:{
              Authorization : "Bearer " + localStorage.getItem('token'),
            }
          }
        )
        if(res.data.success){
            getDocteurRdv();
            message.success(res.data.message);
        }
        
    } catch (error) {
        console.log(error)
        message.error('Something Went Wrong')
    }
}

const columns = [
    {
        title: 'ID',
        dataIndex:'_id'
    },
    {
        title: 'Nom',
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
    {
        title: 'Actions',
        dataIndex:'actions',
        render: (text, record) => (
            <div className="actions-flex">
                {record.status === "en attente" && (
                    <div className="actions-flex">
                        <button className="action-btn" onClick={()=> handleStatus(record, "approuvée")}>Approuver</button>
                        <button className="action-btn red" onClick={()=> handleStatus(record, "rejectée")}>Rejecter</button>
                    </div>
                )

                }
            </div>
        )
    },
]

  return (
    <>
        <Layout>
            <div className="rdv">
                <h1 className='users-h1'>Liste des rendez-vous</h1>
                <Table columns={columns} dataSource={docteurRdv}/>
            </div>
        </Layout>
    </>
  )
}

export default DocteurRdv
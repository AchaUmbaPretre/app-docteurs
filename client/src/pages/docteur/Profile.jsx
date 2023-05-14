import { useEffect, useState } from 'react'
import Layout from '../../composants/layout/Layout'
import './profile.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { message, Col, Form, Input, Row } from 'antd';

const Profile = () => {

  const [docteur, setDocteur] = useState(null);
  const  params = useParams();
  const navigate = useNavigate();

  const getProfile = async () =>{
      try {
        const res = await axios.post("/api/docteur/getDocteurInfo", { userId: params.id },
            { Headers:{
              Autorization: `Bearer ${localStorage.getItem('token')}`
            }}
            
          )
          if(res.data.success){
            setDocteur(res.data.data)
          }
      } catch (error) {
        console.log(error)
      }
  }

  const handleFinish = async (values) =>{
    try {
      const res = await axios.post("/api/docteur/updateProfile", { ...values, /* userId: user._id */},
        { Headers:{
          Autorization: `Bearer ${localStorage.getItem('token')}`
        }}
      )
        if(res.data.success){
          message.success(res.data.message);
          navigate('/')
        }
        else{
          message.error(res.data.message)
        }
      
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(()=>{
    getProfile()
  }, []);

  return (
    <>
        <Layout>
            <div className="profile">
                <h1 className="users-h1">Manage Profile</h1>
                <Form layout='vertical' onFinish={handleFinish} initialValues={docteur}>
                    <h3 className="appDoctor-h3">Personal Detail :</h3>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"First name"} name={'firstname'} required rules={[{required: true}]}>
                                <Input type='text' placeholder='votre nom...'/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"Last name"} name={'lastname'} required rules={[{required: true}]}>
                                <Input type='text' placeholder='votre nom...'/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"Phone"} name={'phone'} required rules={[{required: true}]}>
                                <Input type='text' placeholder='+243...'/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"Email"} name={'email'} required rules={[{required: true}]}>
                                <Input type='text' placeholder='khonde@gmail.com'/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"Website"} name={'website'} >
                                <Input type='text' placeholder='votre website;.'/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"Adresse"} name={'adresse'} required rules={[{required: true}]}>
                                <Input type='text' placeholder='votre adresse...'/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <h3 className="appDoctor-h3">Professional Details :</h3>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"Specialisation"} name={'specialisation'} required rules={[{required: true}]}>
                                <Input type='text' placeholder='votre specialisation..'/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"Experience"} name={'experience'} required rules={[{required: true}]}>
                                <Input type='text' placeholder='votre experience..'/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"FeesPerCunsaltation"} name={'feesPerCunsaltation'} required rules={[{required: true}]}>
                                <Input type='text' placeholder='votre contact..'/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}></Col>
                        <Col xs={24} md={24} lg={8}  className="rows-profil">
                          <button className="btn-primary btn-profil" type='submit'>Modifier</button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Layout>
    </>
  )
}

export default Profile
import { useEffect, useState } from 'react'
import Layout from '../../composants/layout/Layout'
import './profile.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'
import { message, Col, Form, Input, Row, TimePicker } from 'antd';
import { useSelector } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/featured/alertSlide';
import { useDispatch } from 'react-redux';
import moment from 'moment';
const Profile = () => {

  const [docteur, setDocteur] = useState(null);
  const params = useParams();
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user)
  const dispatch = useDispatch()
 
  useEffect(()=>{
    const getProfile = async () =>{
      try {
        const res = await axios.post("http://localhost:8800/api/docteur/getDocteurInfo", { userId: params.id },
          {
            headers:{
              Authorization : "Bearer " + localStorage.getItem('token'),
            }
          }
          )
          if(res.data.success){
            setDocteur(res.data.data)
          }
      } catch (error) {
        console.log(error)
      }
  }
    getProfile()
  }, []);
  
  const handleFinish = async (values) =>{
    try {
      dispatch(showLoading())
      const res = await axios.post("http://localhost:8800/api/docteur/updateProfile", { ...values, userId: user._id, timings:[
        moment(values.timings[0], 'HH:mm'),
        moment(values.timings[1], 'HH:mm')
      ]},
      {
        headers:{
          Authorization : "Bearer " + localStorage.getItem('token'),
        }
      }
      )
      dispatch(hideLoading())
        if(res.data.success){
          message.success(res.data.message);
          navigate('/')
        }
        else{
          message.error(res.data.message)
        }
      
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
    }

  }


  return (
    <>
        <Layout>
            <div className="profile">
                <h1 className="users-h1">Profil du gestionnaire</h1>
              {docteur &&(
                <Form layout='vertical' onFinish={handleFinish} initialValues={{...docteur,timings: [
                  moment(docteur.timings[0], 'HH:mm'),
                  moment(docteur.timings[1], 'HH:mm')
                ]}}>
                    <h3 className="appDoctor-h3">Detail personnel:</h3>
                    <Row gutter={20}>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"Prenom"} name={'firstname'} required rules={[{required: true}]}>
                                <Input type='text' placeholder='votre nom...'/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"Nom"} name={'lastname'} required rules={[{required: true}]}>
                                <Input type='text' placeholder='votre nom...'/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"Numero"} name={'phone'} required rules={[{required: true}]}>
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
                    <h3 className="appDoctor-h3">Details professionnels :</h3>
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
                            <Form.Item label={"Remuneration des frais"} name={'feesPerCunsaltation'} required rules={[{required: true}]}>
                                <Input type='text' placeholder='frais..'/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"Horaires"} name={'timings'} required rules={[{required: true}]}>
                                <TimePicker.RangePicker format={'HH:mm'}/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}></Col>
                        <Col xs={24} md={24} lg={8} className="rows-profil">
                          <button className="btn-primary btn-profil" type='submit'>Modifier</button>
                        </Col>
                    </Row>
                </Form>
                ) }
            </div>
        </Layout>
    </>
  )
}

export default Profile
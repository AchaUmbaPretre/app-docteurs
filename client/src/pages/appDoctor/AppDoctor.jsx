import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import Layout from '../../composants/layout/Layout'
import './appDoctor.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/featured/alertSlide'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const AppDoctor = () => {
    const dispatch = useDispatch();
    const {user} =  useSelector(state => state.user);
    const  navigate  = useNavigate();
    const handLeFinish = async(values) =>{
        try {
            dispatch(showLoading())
            const res = await axios.post("http://localhost:8800/api/user/appDocteur",{...values, userId: user._id, timings: [
                moment(values[0].format("HH:mm")),
                moment(values[1].format("HH:mm"))
            ]},{
                headers:{
                    Authorization : "Bearer " + localStorage.getItem('token'),
                }
            })
            dispatch(hideLoading())
            if(res.data.success){
                message.success(res.data.message);
                navigate('/')
            }
            else{
                message.error(res.data.message)
            }
            
        } catch (error) {
            dispatch(showLoading())
            console.log(error)
            message.error('Somthing Went Wrong')
        }
    }

  return (
    <>
        <Layout>
            <div className="appDoctor">
                <h1 className="users-h1">Application docteur</h1>
                <Form layout='vertical' onFinish={handLeFinish}>
                    <h3 className="appDoctor-h3">Detail personnel :</h3>
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
                                <Input type='text' placeholder='votre contact..'/>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"Horaires"} name={'timings'} required rules={[{required: true}]}>
                                <TimePicker.RangePicker format={'HH:mm'}/>
                            </Form.Item>
                        </Col>
                    </Row>
                    <button className="btn-primary" type='submit'>Envoyer</button>
                </Form>
            </div>
        </Layout>
    </>
  )
}

export default AppDoctor
import { Col, Form, Input, Row, TimePicker, message } from 'antd'
import Layout from '../../composants/layout/Layout'
import './appDoctor.css'

const AppDoctor = () => {

    const handLeFinish = (values) =>{
        try {
            
        } catch (error) {
            console.log(error)
            message.error('Somthing Went Wrong')
        }
    }

  return (
    <>
        <Layout>
            <div className="appDoctor">
                <h1 className="appDoctor-h1">APPLICATION DOCTEUR</h1>
                <Form layout='vertical' onFinish={handLeFinish}>
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
                        <Col xs={24} md={24} lg={8}>
                            <Form.Item label={"Timings"} name={'timings'} required rules={[{required: true}]}>
                                <TimePicker.RangePicker format={'HH : mm'}/>
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
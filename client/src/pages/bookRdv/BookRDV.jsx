import axios from 'axios'
import Layout from '../../composants/layout/Layout'
import './bookRdv.css'
import { useEffect, useState } from 'react'
import { Col, DatePicker, Form, Input, Row, TimePicker,message} from 'antd'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { hideLoading, showLoading } from '../../redux/featured/alertSlide'

const BookRDV = () => {
  const {user} = useSelector(state => state.user)
  const dispatch  = useDispatch();
  const params = useParams();
  const [ docteur, setDocteur] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);
  const [lastname, setLastname] = useState();
  const [numero, setNumero] = useState();


  useEffect(() => {
  const getUser = async () =>{
    try {
      const res = await axios.post('http://localhost:8800/api/docteur/getDocteurById',{
        docteurId: params.docteurId
      }, {
        headers:{
          Authorization : "Bearer " + localStorage.getItem('token'),
        }
      })
      if(res.data.success){
        setDocteur(res.data.data)
      }
    } catch (error) {
      console.log(error)
    }   
  }
  
    getUser();
    // eslint-disable-next-line
  }, [])


const handleAvailability = async()=>{
  try {
    dispatch(showLoading());
    const res = await axios.post('http://localhost:8800/api/user/booking-availability', {
      docteurId: params.docteurId,
      date: date,
      time: time
    }, {
      headers:{
        Authorization : "Bearer " + localStorage.getItem('token'),
      }
    })
    dispatch(hideLoading());
    if(res.data.success){
      setIsAvailable(true)
      message.success(res.data.message)
    }else{
      message.error(res.data.message)
    }
  } catch (error) {
    dispatch(hideLoading());
    console.log(error)
  }
}

const handleBooking = async()=>{
  try {
    setIsAvailable(true)
    if(!time && !date){
      return alert('Date et time sont obligatoire')
    
    }
    dispatch(showLoading());
    const res = await axios.post('http://localhost:8800/api/user/book-rdv', {
      docteurId: params.docteurId,
      userId: user._id,
      docteurInfo: docteur,
      lastname: lastname,
      numero:numero,
      date: date,
      userInfo: user,
      time: time
    }, {
      headers:{
        Authorization : "Bearer " + localStorage.getItem('token'),
      }
    })
    dispatch(hideLoading())
    if(res.data.success){
      setIsAvailable(true)
      message.success(res.data.message)
    }
    
  } catch (error) {
    dispatch(hideLoading());
    console.log(error)
  }
}
  return (
    <Layout>
        <div className="bookRdv">
           <h1 className="profile-h1">Page de reservation</h1>
           { docteur && (
           <div className="book-container">
              <div className="book-rows">
                <h4 className="book-h4">Dr. {docteur?.firstname} {docteur?.lastname}</h4>
                <h4 className="book-h4">Frais : {docteur?.feesPerCunsaltation} $</h4>
                <h4 className="book-h4">Horaires : {docteur?.timings[0]} - {docteur?.timings[1]}</h4>
                <div className="book-flex">
                <Form layout='vertical'>
                  <Row gutter={20}>
                    <Col xs={24} md={24} lg={12}>
                      <Form.Item label={"Nom"} name={'lastname'} >
                        <Input type='text' name='lastname' placeholder='Nom...' onChange={e =>setLastname(e.target.value)}/>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={12}>
                      <Form.Item label={"Numero"} name={'numero'}>
                        <Input type='text' name='numero' placeholder='+243...' onChange={(e)=>setNumero(e.target.value)}/>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={20}>
                    <Col xs={24} md={24} lg={12}>
                      <Form.Item label={"Date"} name={'date'}>
                        <DatePicker aria-required='true' format={"DD-MM-YYYY"} onChange={(value)=>{setDate(moment(value).format("DD-MM-YYYY"))}}/>
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={24} lg={12}>
                      <Form.Item label={"Heure"} name={'heure'}>
                        <TimePicker aria-required='true' format="HH:mm" onChange={(value)=>{setTime(moment(value))}}/>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
                  <button className='book-btn' onClick={handleAvailability}>Voir les disponibilité</button>
                  {!isAvailable &&
                  <button className='book-btn btn-black' onClick={handleBooking}>Reserve maintenant</button>}
                </div>
              </div>
           </div>)}
        </div>
    </Layout>
  )
}

export default BookRDV
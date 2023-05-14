import axios from 'axios'
import Layout from '../../composants/layout/Layout'
import './bookRdv.css'
import { useEffect, useState } from 'react'
import { DatePicker, TimePicker,message} from 'antd'
import { useParams } from 'react-router-dom'

const BookRDV = () => {
  /* const {user} = useSelector(state => state.user) */
  const params = useParams();
  const [ docteur, setDocteur] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState(false);

  const getUser = async () =>{
    try {
      const res = await axios.post('/api/docteur/getDocteurById',{
        docteurId: params.docteurId
      }, {
        headers:{
          Authorization : "Bearer" + localStorage.getItem('token'),
        }
      })
      if(res.data.success){
        setIsAvailable(true)
        setDocteur(res.data.data)
      }
      
    } catch (error) {
      console.log(error)
    }   
  }
  useEffect(() => {
    getUser();
  }, [])

const handleBooking = async(req, res)=>{
  try {
    const res = await axios.post('/api/user/book-rdv', {
      docteurId: params.docteurId,
      /* userId: user._id, */
      docteurInfo: docteur,
      date: date,
      /* userInfo: user, */
      time: time

    }, {
      headers:{
        Authorization : "Bearer " + localStorage.getItem('token'),
      }
    })
    if(res.data.success){
      message.success(res.data.message)
    }
    
  } catch (error) {
    console.log(error)
  }
}

const handleAvailability = async(req, res)=>{
  try {
    const res = await axios.post('/api/user/booking-availability', {
      docteurId: params.docteurId,
      date: date,
      time: time
    }, {
      headers:{
        Authorization : "Bearer " + localStorage.getItem('token'),
      }
    })
    if(res.data.success){
      message.success(res.data.message)
      setIsAvailable(true)
    }else{
      message.error(res.data.message)
    }
    
  } catch (error) {
    console.log(error)
  }
}

  return (
    <Layout>
        <div className="bookRdv">
           <h1 className="profile-h1">Booking page</h1>
           <div className="book-container">
              <div className="book-rows">
                <h4 className="book-h4">Dr. Ndambi umba</h4>
                <h4 className="book-h4">Fees : </h4>
                <h4 className="book-h4">Timings : 11:22 - 13:19</h4>
                <div className="book-flex">
                  <DatePicker format={"DD-MM-YYYY"} onChange={(value)=>{setIsAvailable(false);setDate(value)}}/>
                  <TimePicker.RangePicker format={"HH:mm"} onChange={(value)=>setTime(value)}/>
                  <button className='book-btn' onClick={handleAvailability}>Check Availability</button>
                  {isAvailable &&
                  <button className='book-btn btn-black' onClick={handleBooking}>Book now</button>}
                </div>
              </div>
           </div>
        </div>
    </Layout>
  )
}

export default BookRDV
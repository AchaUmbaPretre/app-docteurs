import { Tabs, message } from 'antd'
import axios from "axios"
import Layout from '../../composants/layout/Layout'
import './notification.css'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../../redux/featured/alertSlide'
import { useNavigate } from 'react-router-dom'

const Notification = () => {

const navigate  = useNavigate();
const dispatch = useDispatch();
const { user } = useSelector((state) => state.user);

 const handleMarkALLRead = async () =>{

  try {
    dispatch(showLoading())
      const res = await axios.post("http://localhost:8800/api/user/get-all-notification",{userId: user._id}, {
        headers:{
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
      } else{
        message.error(res.data.message)
      }
    
  } catch (error) {
    dispatch(hideLoading())
    console.log(error)
    message.error("Somthing Went Wrong In Notifications")
  }
  }

 const  handleDeleteLLRead = async () =>{
 try {
      dispatch(showLoading())
      const res = await axios.post("http://localhost:8800/api/user/delete-all-notification", {userId: user._id}, {
        headers:{
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading())
      if(res.data.success){
        message.success(res.data.message)
      } else{
        message.error(res.data.message)
      }
      
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      message.error("Somthing Went Wrong In Notifications")
    } 
  }
  return (
    <>
        <Layout>
          <div className="notification">
            <h4 className="notification-h4">Notification</h4>
            <Tabs>
              <Tabs.TabPane tab='Non lu' key={0}>
                <div className="notification-rows">
                  <h4 className="notification-h4" onClick={handleMarkALLRead}>Marquer tout comme lu</h4>
                </div>
                { 
                  user?.notification.map(notificationMgs =>(
                    <div className="notification-read">
                      <div className="notification-text"  onClick={()=>navigate(notificationMgs.onClickPath)}>
                        {notificationMgs.message}
                      </div>
                    </div>
                  ))
                }
              </Tabs.TabPane>
              <Tabs.TabPane tab='Lire' key={1}>
                <div className="notification-rows">
                  <h4 className="notification-h4" onClick={handleDeleteLLRead}>Supprimer tout lu</h4>
                </div>
                {
                  user?.seennotification.map(seenotificationMgs =>(
                    <div className="notification-read">
                      <div className="notification-text" onClick={()=> navigate(seenotificationMgs.onClickPath)}>
                        {seenotificationMgs.message}
                      </div>
                    </div>
                  ))
                }
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Layout>
    </>
  )
}

export default Notification
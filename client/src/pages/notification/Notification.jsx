import { Tabs, message } from 'antd'
import axios from "axios"
import Layout from '../../composants/layout/Layout'
import './notification.css'

const Notification = () => {

/*   const { user } = useSelector((state) => state.user) */

  const handleMarkALLRead = async () =>{
    
  }
  const  handleDeleteLLRead = async () =>{
/*     try {
      const res = await axios.post("api/user/delete-all-notification", {userId: user._id}, {
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
      console.log(error)
      message.error("Somthing Went Wrong In Notifications")
    } */
  }
  return (
    <>
        <Layout>
          <div className="notification">
            <h4 className="notification-h4">Notification</h4>
            <Tabs>
              <Tabs.TabPane tab='unRead' key={0}>
                <div className="notification-rows">
                  <h4 className="notification-h4" onClick={handleMarkALLRead}>Mark All Read</h4>
                </div>
                {/* {
                  user?.notification.map(notificationMgs =>(
                    <div className="notification-read" onClick={notificationMgs.onclickPath}>
                      <div className="notification-text">
                        {notificationMgs.message}
                      </div>
                    </div>
                  ))
                } */}
              </Tabs.TabPane>
              <Tabs.TabPane tab='Read' key={1}>
                <div className="notification-rows">
                  <h4 className="notification-h4" onClick={handleDeleteLLRead}>Delete All Read</h4>
                </div>
                {/* {
                  user?.seennotification.map(seenotificationMgs =>(
                    <div className="notification-read" onClick={notificationMgs.onclickPath}>
                      <div className="notification-text">
                        {notificationMgs.message}
                      </div>
                    </div>
                  ))
                } */}
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Layout>
    </>
  )
}

export default Notification
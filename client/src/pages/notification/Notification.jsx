import { Tabs } from 'antd'
import Layout from '../../composants/layout/Layout'
import './notification.css'

const Notification = () => {

  const handleMarkALLRead = () =>{

  }
  const  handleDeleteLLRead = () =>{

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
              </Tabs.TabPane>
              <Tabs.TabPane tab='Read' key={1}>
                <div className="notification-rows">
                  <h4 className="notification-h4" onClick={handleDeleteLLRead}>Delete All Read</h4>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Layout>
    </>
  )
}

export default Notification
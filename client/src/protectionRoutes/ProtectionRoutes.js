import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from 'react-router-dom'
import { hideLoading } from '../redux/featured/alertSlide';
import axios from "axios"
import { setUser } from '../redux/featured/userSlide';


export const ProtectionRoute = ({ children }) => {

    const dispatch  = useDispatch();
    const {user} = useSelector(state => state.user)

/*     const getUserData = async()=>{
        try {
            const res = await axios.post("http://localhost:8800/api/user/getUser",
            { token: localStorage.getItem("token")},
            {
                headers:{
                    Autorization: "Bearer " + localStorage.getItem('token')
                }
            })

            if(res.data.success){
                dispatch(setUser(res.data.data))
            }
            else{
                <Navigate to={'/login'}/>
            }
            
        } catch (error) {
            dispatch(hideLoading)
            console.log(error)
        }
    } */

    useEffect(()=>{
        const getUserData = async()=>{
            try {
                const res = await axios.post("http://localhost:8800/api/user/getUser",
                { token: localStorage.getItem("token")},
                {
                    headers:{
                        Authorization : "Bearer " + localStorage.getItem('token'),
                      }
                })
    
                if(res.data.success){
                    dispatch(setUser(res.data.data))
                }
                else{
                    <Navigate to={'/login'}/>
                }
                
            } catch (error) {
                dispatch(hideLoading)
                console.log(error)
            }
        }
        if(!user){
            getUserData()
        }
    }, [user])

    if(localStorage.getItem("token")){
        return children
    }
    else{
        return <Navigate to={'/login'}/>
    }
}
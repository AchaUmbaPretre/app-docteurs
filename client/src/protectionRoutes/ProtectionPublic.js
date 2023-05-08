import React from 'react'
import { Navigate } from 'react-router-dom'


export const ProtectionPublic = ({children}) => {

    if(localStorage.getItem('token')){
        return <Navigate to={'/'}/>
    }
    else{
        return children
    }
}
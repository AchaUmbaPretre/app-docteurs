import { createSlice } from "@reduxjs/toolkit"

export const alertSlide = createSlice({
    "name": "alert",
    initialState: {
        loading: false
    },
    reducers:{
        showLoading: (state) =>{
            state.loading = true
        },
        hideLoading: (state) =>{
            state.loading = true
        }
    }
})

export const {showLoading, hideLoading} = alertSlide.action;
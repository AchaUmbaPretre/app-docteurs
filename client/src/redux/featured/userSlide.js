import { createSlice } from "@reduxjs/toolkit"

export const userSlide = createSlice({
    'name': 'user',
    initialState:{
        user: null
    },
    reducers:{
        setUser : (state, action) =>{
            state.user  = action.payload
        }
    }
})

export const {setUser} = userSlide.actions;
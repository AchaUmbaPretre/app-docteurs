import { configureStore} from "@reduxjs/toolkit"
import { alertSlide } from "./featured/alertSlide"
import { userSlide } from "./featured/userSlide"

export default configureStore({
    reducer: {
        alerts : alertSlide.reducer,
        user: userSlide.reducer
    }
})
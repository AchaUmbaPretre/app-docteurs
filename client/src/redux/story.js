import { configureStore} from "@reduxjs/toolkit"
import { alertSlide } from "./featured/alertSlide"

export default configureStore({
    reducer: {
        alert : alertSlide.reducer,
    }
})
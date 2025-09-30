import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../redux/UserSlice"
import InterviewSlice from "../redux/InterviewSlice"

const Store = configureStore({
    reducer: {
        user: UserSlice,
        interview: InterviewSlice
    },
})

export default Store
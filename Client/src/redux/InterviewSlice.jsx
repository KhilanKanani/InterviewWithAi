import { createSlice } from "@reduxjs/toolkit";

const InterviewSlice = createSlice({
    name: "interview",

    initialState: {
        interviewdata: null,
        history: null,
        allInterview: null
    },

    reducers: {
        setInterviewdata: (state, action) => {
            state.interviewdata = action.payload;
        },

        setHistorydata: (state, action) => {
            state.history = action.payload;
        },

        setAllInterview: (state, action) => {
            state.allInterview = action.payload;
        },
    },
});

export const { setInterviewdata, setHistorydata, setAllInterview } = InterviewSlice.actions
export default InterviewSlice.reducer
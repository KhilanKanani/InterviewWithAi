import { createSlice } from "@reduxjs/toolkit";
import FetchCurrentUser from "../FindCurrentUser/GetCurrentUser";

const UserSlice = createSlice({
    name: "user",

    initialState: {
        isLoading: false,
        userdata: null,
    },

    reducers: {
        setUserdata: (state, action) => {
            state.userdata = action.payload;
        },

        setIsLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(FetchCurrentUser.pending, (state) => {
                state.isLoading = true
            })

            .addCase(FetchCurrentUser.fulfilled, (state, action) => {
                state.userdata = action.payload
                state.isLoading = false;
            })

            .addCase(FetchCurrentUser.rejected, (state) => {
                state.isLoading = false;
            });
    }
});

export const { setUserdata, setIsLoading } = UserSlice.actions
export default UserSlice.reducer
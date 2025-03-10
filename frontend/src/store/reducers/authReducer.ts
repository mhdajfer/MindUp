import { IUser } from "@/app/types/IUser";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

interface authState {
  user: IUser | null;
  isLoggedIn: boolean;
}

const initialState: authState = {
  user: null,
  isLoggedIn: false,
};



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLogin: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.isLoggedIn = true;
      //   localStorage.setItem("token", action.payload.token);
      Cookies.set("accessToken", action.payload.token);
    },
    userLogout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      // localStorage.removeItem("token");
      Cookies.remove("accessToken");
    },
    userUpdate: (state, action: PayloadAction<{ user: IUser }>) => {
      state.user = action.payload.user;
    },
  },
});

export const { userLogin, userLogout, userUpdate } = authSlice.actions;

export default authSlice.reducer;

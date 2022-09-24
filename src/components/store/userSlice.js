import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "",
    email: "",
  },
  reducers: {
    updateUser(state, action) {

      const stringify = JSON.parse(action.payload)

      const {username, email} = stringify
      state.username = username
      state.email = email
      
      console.log(username, email, action.payload)

    },
  },
});


export const userActions = userSlice.actions
export default userSlice
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import userService from '../../service/user.service'


const initialState = {
  users: [],
  isLoading: false,
  errorMessage: '',
}

export const fetchUsers = createAsyncThunk(
  "userAbout/fetchUsers",
  async () => {
    const response = await userService.fetchUser();
    return response;
  }
);

const userSlice = createSlice({
  name: "userAbout",
  initialState,
  reducers: {
    logout: (state) => {
      state.users = null;
      state.errorMessage = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

const { reducer } = userSlice;
export default reducer;
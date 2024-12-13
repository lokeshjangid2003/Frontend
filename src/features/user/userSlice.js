import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  fetchLoggedInUserOrders, updateUser ,fetchLoggedInUser} from './userAPI';

const initialState = {
  userOrders: 0,
  status: 'idle',
  userInfo:null, // this info will be used in case of detailed user Info, while auth will only authentication
};

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  'counter/fetchLoggedInUserOrders',
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
);


export const fetchLoggedInUserAsync=createAsyncThunk(
  'user/fetchLoggedInUser',
  async (id)=>{
    const response=await fetchLoggedInUser(id);
    return response.data;
  }
)

export const updateUserAsync=createAsyncThunk(
  'user/updateUser',
  async (update)=>{
    const response=await updateUser(update);
    return response.data;
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInUserOrdersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserOrdersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userOrders= action.payload;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userInfo=action.payload;
      })
      .addCase(fetchLoggedInUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLoggedInUserAsync.fulfilled,(state, action) => {
        state.status = 'idle';
        state.userInfo=action.payload;
      })
  },
});

export const { increment} = userSlice.actions;

export const selectUserInfo=(state)=>state.user.userInfo;
export const selectUserOrders =(state)=>state.user.userOrders;

export default userSlice.reducer;

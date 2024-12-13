import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { updateUser } from '../user/userAPI';
import { checkUser,createUser, signOut} from './authAPI';

import { act } from 'react';
const initialState = {
  loggedInUser:null, // this should only contain user identity 'id','role'
  status: 'idle',
  error:null
};

export const checkUserAsync = createAsyncThunk(
  'auth/checkUser',
  async (loginInfo,{rejectWithValue}) => {
    try{
      const response = await checkUser(loginInfo);
      return response.data;
    }
    catch(error){
      console.log(error);
      return rejectWithValue(error);
      // ye ek readmade function jisme hum jo bhi error dalenge vo it will put it into action.payload
    }
  }
);
export const signOutAsync = createAsyncThunk(
  'auth/signOut',
  async () => {
    const response = await signOut();
    return response.data;
  }
);



export const createUserAsync = createAsyncThunk(
  'auth/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload;
      })
      .addCase(signOutAsync.rejected, (state, action) => {
        state.status = 'idle';
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser=null;
      })
  },
});

// export const { increment} = authSlice.actions;

export const selectLoggedInUser=(state)=>state.auth.loggedInUser;
export const selectError=(state)=>state.auth.error;
export default authSlice.reducer;

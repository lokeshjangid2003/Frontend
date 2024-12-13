import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCarts, deleteItemFromCart, fetchItemsByUserID, resetCart, updateCart} from './cartAPI';

const initialState = {
  status: 'idle',
  items:[],
};

export const updateToCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (item) => {
    const response = await updateCart(item);
    return response.data;
  }
);


export const addToCartAsync = createAsyncThunk(
  'cart/fetchCarts',
  async (item) => {
    const response = await addToCarts(item);
    return response.data;
  }
);

export const fetchItemsByUserIDAsync=createAsyncThunk(
  'cart/fetchItemsByUserID',
  async (userId)=>{
    const response=await fetchItemsByUserID(userId);
    console.log('fecthed data : ',response);
    return response.data;
  }
);

export const deleteItemFromCartAsync=createAsyncThunk(
  'cart/deleteItemFromCart',
  async (itemId)=>{
    const response=await deleteItemFromCart(itemId);
    return response.data;
  }
)


export const resetCartAsync=createAsyncThunk(
  'cart/resetCart',
  async (userId)=>{
    const response=await resetCart(userId);
    return response.status;
});

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIDAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIDAsync.fulfilled, (state, action)=> {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateToCartAsync.fulfilled, (state, action)=> {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action)=> {
        state.status = 'idle';
        const index=state.items.findIndex(item=>item.id===action.payload.id)
        state.items.splice(index,1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action)=> {
        state.status='idle';
        state.items=[];
      });
  },
});

export const { increment} = cartSlice.actions;


export const selectCarts = (state) => state.cart.items;
export const selectAllCarts=(state)=>state.cart.items;
export default cartSlice.reducer;

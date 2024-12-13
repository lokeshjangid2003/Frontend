import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../features/product/productSlice';
import authReducer from '../features/Auth/authSlice';
import  cartSlice  from '../features/cart/cartSlice';
import orderReducer from '../features/orders/orderSlice';
import userReducer  from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    product:productReducer,
    auth:authReducer,
    cart:cartSlice,
    order:orderReducer,
    user:userReducer
  },
});

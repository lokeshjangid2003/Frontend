import React, { useEffect } from 'react';
import './App.css';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout'
import PageNotFound from './pages/404';

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import ProductDetailPage from './pages/ProductDetailPage';
import Protected from './features/Auth/components/Protected';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIDAsync } from './features/cart/cartSlice';
import { selectLoggedInUser } from './features/Auth/authSlice';
import OrderSuccess from './pages/OrderSuccess';
import UserOrders from './features/user/components/UserOrders';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfile from './features/user/components/UserProfile';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/Auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProtectedAdmin from './features/Auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import ProductForm from './features/admin/components/ProductForm';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
import { fetchAllOrderAsync } from './features/orders/orderSlice';



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected><Home></Home></Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>   
    ),
  },
  {
    path: "/signin",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/login",
    element: (
      <LoginPage></LoginPage>
    ),
  },
  {
    // only for testing - then p
    path:"/cart",
    element:<Protected><CartPage></CartPage></Protected>,
  },
  {
    path:'/checkout',
    element:<Protected><Checkout></Checkout></Protected>,
  },
  {
    path:'/product-detail/:id',
    element:<Protected><ProductDetailPage></ProductDetailPage></Protected>,
  },
  {
    path:'/admin/product-detail/:id',
    element:<ProtectedAdmin> <AdminProductDetailPage></AdminProductDetailPage></ProtectedAdmin>,
  },
  {
    path:'/admin/orders',
    element:<ProtectedAdmin> <AdminOrdersPage></AdminOrdersPage></ProtectedAdmin>,
  },
  {
    path:'/admin/product-form/edit/:id',
    element:<ProtectedAdmin> 
     <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>,
  },
  {
    path:'/admin/product-form',
    element:<ProtectedAdmin> 
     <AdminProductFormPage></AdminProductFormPage>
    </ProtectedAdmin>,
  },
  {
    path:'*',
    element:<PageNotFound></PageNotFound>,
  }
  ,{
    path:'/order-success/:id',
    element:<OrderSuccess></OrderSuccess>
  },
  {
    path:'/orders',
    element:<UserOrdersPage></UserOrdersPage>
  },
  {
   path:'/profile',
   element:<UserProfilePage></UserProfilePage>
  },
  {
   path:'/logout',
   element:<Logout></Logout>
  },
  {
   path:'/forgot-password',
   element:<ForgotPasswordPage></ForgotPasswordPage>
  }
  
]);






function App() {
  const user=useSelector(selectLoggedInUser);
  const dispatch=useDispatch();
   
  useEffect(()=>{
    if(user){
      console.log('dispatch ho gya ');
      dispatch(fetchItemsByUserIDAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
      dispatch(fetchAllOrderAsync());
    }
    },[dispatch,user]);

  return (
    <div className="App">
     <RouterProvider router={router} />
    </div>
  );
}

export default App;

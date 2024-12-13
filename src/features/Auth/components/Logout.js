import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser, signOutAsync } from "../authSlice";
import { Navigate } from "react-router-dom";

function Logout(){
  const dispatch=useDispatch();
  const user=useSelector(selectLoggedInUser);

  useEffect(()=>{dispatch(signOutAsync())},[])
  // but useEffect runs after render, we have to delay navigation
  // so we can get information

  return (
    <>
    {!user && <Navigate to='/login' replace={true}></Navigate> }
    </>
  )
}

export default Logout;
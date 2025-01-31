import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useForm, SubmitHandler } from "react-hook-form"
import { createUserAsync, selectLoggedInUser} from '../authSlice';
import { Navigate } from 'react-router-dom';


function Signup() {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  


  console.log(errors);

  const passwordMsg=`- at least 8 characters\n
  - must contain at least 1 uppercase letter\n,
  1 lowercase letter, and 1 number\n
  - Can contain special characters\n`;
  return (
  <>
    {user && <Navigate to='/' replace={true}></Navigate>}
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="My Company"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* html ka vaidation hatane k liye noValidate likha ki jo bhi hm input na likhe uska error hum console me fetch kr ske , jo hm   */}
          <form noValidate className="space-y-6" onSubmit={handleSubmit((data)=>{
            dispatch(createUserAsync(
              {email:data.email,
              password:data.password,
              addresses:[],
              role:'user'

              //TODO: this role can be direclty given on backend
              }))
            console.log(data);
          })}
          
          >
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email",{ required: "email is required",pattern:{value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message:'email is not Valid'}})}
                  type="email"
                  // required
                  // autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
             { errors.email &&  <p className='text-red-500'>{errors.email.message}</p>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password",{ required: "password is required" ,pattern:{value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,message:passwordMsg}})}
                  type="password"
                  // required
                  // autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 { errors.password &&  <p className='text-red-500'>{errors.password.message}</p>}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Confirm Password
                </label>

              </div>
              <div className="mt-2">
                <input
                  id="confirmpassword"
                  {...register("confirmpassword",{ required: "confirm password is required",validate: (value, formValues) => value === formValues.password || 'password is not matching' })}
                  
                  type="password"
                  // required
                  // autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                 { errors.confirmpassword &&  <p className='text-red-500'>{errors.confirmpassword.message}</p>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to='/login' className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              LogIn
            </Link>
          </p>
        </div>
      </div>
    </>

  );
}

export default Signup;

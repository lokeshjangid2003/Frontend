import { useDispatch, useSelector } from "react-redux";

import { selectUserInfo, updateUserAsync } from "../userSlice";
import { useState } from "react";
import { selectLoggedInUser } from "../../Auth/authSlice";
import { useForm } from "react-hook-form";

function UserProfile(){
  const dispatch=useDispatch();
  const usern=useSelector(selectLoggedInUser);
  const userInfo=useSelector(selectUserInfo)
  console.log('users in profile : ',userInfo);
  
  
  const [selectedEditIndex,setSelectedEditIndex]=useState(-1);

  const [showAddAddressForm,setShowAddAddressForm]=useState(false);

  function handleEdit(addressUpdate,index){
    const newUser={...userInfo,addresses:[...userInfo.addresses]};
    newUser.addresses.splice(index,1,addressUpdate);
    dispatch(updateUserAsync(newUser));
    setSelectedEditIndex(-1);
  }

  function handleRemove(e,index){
    const newObj={...userInfo,addresses:[...userInfo.addresses]};
    newObj.addresses.splice(index,1);
    dispatch(updateUserAsync(newObj));
  }

  function handleAdd(data){
    const newObj={...userInfo,addresses:[...userInfo.addresses,data]};
    dispatch(updateUserAsync(newObj));
    setShowAddAddressForm(false);
  }
  
  
    const {
      register,
      handleSubmit,
      watch,
      reset,
      setValue,
      formState: { errors },
    } = useForm()


  function handleEditFrom(index){
    setSelectedEditIndex(index);
    const address=userInfo.addresses[index];
    setValue('name',address.name);
    setValue('email',address.email);
    setValue('phone',address.phone);
    setValue('street',address.street);
    setValue('city',address.city);
    setValue('state',address.state);
    setValue('pinCode',address.pinCode);
  }




  return(
    <div>
      <div>

            <div className="mx-2 max-w-7xl  bg-white px-8 sm:px-4  lg:px-8">
          
   
               <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="mt-8">
                    <h1 className="text-4xl my-5">My Profile</h1>
                   <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                      Name : {userInfo.password}
                    </h1>
                   <h3 className="text-4xl my-5 font-bold tracking-tight text-red-900">
                      email address : {userInfo.email}
                  </h3>
                 
                 {userInfo.role==='admin' && 
                   <h3 className="text-4xl my-5 font-bold tracking-tight text-red-900">
                      role :{userInfo.role}
                  </h3>
                 }
                  </div>
                </div>

              
         <div className="border-t border-gray-200 px-4 py-6 sm:px-6">

             <button
                  type="submit"
                  className="flex rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 my-5"
                  onClick={(e)=>setShowAddAddressForm(true)}
                >
                  Add New Address
                </button>

                {showAddAddressForm ? <form noValidate className='bg-white px-5 py-5'  onSubmit= {handleSubmit ((data)=>{
                    console.log(data);
                    handleAdd(data);
                    reset();
                  })}>
              <div className="space-y-12">
              
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          {...register('name',{required:'name is required'})}
                          type="text"
                        
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    


                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register('email',{ required: "email is required",pattern:{value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message:'email is not Valid'}})}
                          type="email"
                          
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone Number
                      </label>
                      <div className="mt-2">
                      <input
                          id="phone"
                          {...register('phone',{required:'city is required'})}
                          type='tel'
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          {...register('street',{required:'street adress is required'})}
                          type="text"
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          {...register('city',{required:'city is required'})}
                          type="text"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                        State 
                      </label>
                      <div className="mt-2">
                        <input
                          id="state"
                          {...register('state',{required:'state is required'})}
                          type="text"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        PIN code
                      </label>
                      <div className="mt-2">
                        <input
                          id="pinode"
                          {...register('pinCode',{required:'PIN is required'})}
                          type="text"
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>



                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" 
                onClick={(e)=>setShowAddAddressForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Address
                </button>
                </div> 
                </div>
                </div>
                
            </form>:null}




          <p className="mt-0.5 text-sm text-gray-500"> Your Addresses</p>
      {userInfo.addresses && userInfo.addresses.map((address,index)=>(
             <div>
          

           {(selectedEditIndex===index) ? <form noValidate className='bg-white px-5 py-5'  onSubmit= {handleSubmit ((data)=>{
                    console.log(data);
                    handleEdit(data,index);
                    reset();
                  })}>
              <div className="space-y-12">
              
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">Personal Information</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          {...register('name',{required:'name is required'})}
                          type="text"
                        
                          autoComplete="given-name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    


                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register('email',{ required: "email is required",pattern:{value:/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,message:'email is not Valid'}})}
                          type="email"
                          
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone Number
                      </label>
                      <div className="mt-2">
                      <input
                          id="phone"
                          {...register('phone',{required:'city is required'})}
                          type='tel'
                          
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          {...register('street',{required:'street adress is required'})}
                          type="text"
                        
                          autoComplete="street-address"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          {...register('city',{required:'city is required'})}
                          type="text"
                          
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                        State 
                      </label>
                      <div className="mt-2">
                        <input
                          id="state"
                          {...register('state',{required:'state is required'})}
                          type="text"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                        PIN code
                      </label>
                      <div className="mt-2">
                        <input
                          id="pinode"
                          {...register('pinCode',{required:'PIN is required'})}
                          type="text"
                        
                          autoComplete="postal-code"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>



                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">
                <button type="button" className="text-sm font-semibold leading-6 text-gray-900" 
                onClick={(e)=>setSelectedEditIndex(-1)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Edit Address
                </button>
                </div> 
                </div>
                </div>
                
            </form>:null}
          

           <div className="flex justify-between gap-x-6 py-5 px-5 border-solid border-2 border-gray-200" key={index}>
                  <div className="flex gap-x-4">
                     <div className="sm:flex sm:flex-col ">
                        <p className="text-sm font-semibold leading-6 text-gray-900">name : {address.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Email:{address.email}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">pinCode : {address.pinCode}</p>
                     </div>
                   </div> 
                            
                     <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">Phone : {address.phone}</p>
                      <p className="text-sm leading-6 text-gray-900">Address : {address.street}</p>
                     </div>
                     <div className="hidden sm:flex sm:flex-col sm:items-end">
                     <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500"
                       onClick={()=>handleEditFrom(index)}>
                         Edit
                      </button>
                     <button type="button" className="font-medium text-indigo-600 py-3 hover:text-indigo-500"
                      onClick={(e)=>handleRemove(e,index)}>
                         Remove
                    </button>
                     </div>
                            
                     
                   
                
           </div>
                  
           </div>
              ))}
           </div>
             
           </div>

      </div>

    </div>
  )
}


export default UserProfile;
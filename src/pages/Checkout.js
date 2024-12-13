/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

// import { useState } from 'react'
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
// import { XMarkIcon } from '@heroicons/react/24/outline'
// import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {deleteItemFromCartAsync, selectAllCarts, updateToCartAsync} from '../features/cart/cartSlice'
import { Navigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { selectLoggedInUser} from '../features/Auth/authSlice'
import { createOrderAsync, fecthOrdersAsync, fetchAllOrderAsync, selectCurrentOrder, selectOrders } from '../features/orders/orderSlice'
import { selectUserInfo } from '../features/user/userSlice'
import { updateUserAsync } from '../features/user/userSlice'
import { discountedPrice } from '../app/constant'
import { fecthOrders } from '../features/orders/orderAPI'
// const Items = [
//   {
//     id: 1,
//     name: 'Throwback Hip Bag',
//     href: '#',
//     color: 'Salmon',
//     price: '$90.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
//     imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   },
  
//   // More Items...
// ]

// const address = [
//   {
//     name: 'Lucky Jangid',
//     email: 'lucky333022@gmail.com',
//     phone: '7597945254',
//     pinCode:333022,
//     Address:'ward no. 04, Raghunathpura,udaipurwati,Jhunjhunu',
//   },
//   {
//     name: 'Lokesh jangid',
//     email: 'lokesh333022@gmail.com',
//     phone: '9602005390',
//     pinCode:333022,
//     Address:'Chitkara University,Rajpura,Punjab',
//   },
  
//   ]


function Checkout() {
  const [open, setOpen] = useState(true)
  const Items=useSelector(selectAllCarts);
  console.log('Items are : ',Items);

  const TotalAmount=Items.reduce((total,item)=>discountedPrice(item.product)*item.quantity+total,0);
  const totalItems=Items.reduce((total,item)=>item.quantity+total,0)
  
  const dispatch=useDispatch();
  
  function handleQuantity(e,item){
    dispatch(updateToCartAsync({id:item.id,quantity: +e.target.value}))
  }
  
  function handleRemove(e,id){
    console.log('remove is working one')
    dispatch(deleteItemFromCartAsync(id));
    console.log('remove is working two');
  }
  
  
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()
  
  const user=useSelector(selectUserInfo);
  console.log('current user is  : ',user);



  const currentOrder=useSelector(selectCurrentOrder);
  console.log(errors);

  const orders=useSelector(selectOrders);
  console.log(orders);
  console.log('total orders in Orders : ',orders.length);

  
  const [selectedAddress,setSelectedAddress]=useState();
  const [paymentMethod,setPaymentMethod]=useState('cash');
  
  const handleAddress=(e)=>{
    setSelectedAddress(user.addresses[e.target.value]);
  }
  
  const handlePayment=(e)=>{
    setPaymentMethod(e.target.value);
  }

  const [number,setNumber]=useState(1);
  
    function handleOrder(e){
      if(selectedAddress && paymentMethod){
        const order={
          Items,
          TotalAmount,
          totalItems,
          user:user.id,
          paymentMethod,
          selectedAddress,
          status:'pending'// other status can be delivered, recevied.
        }
   
        dispatch(createOrderAsync(order));
        // TODO : redirect to order-success page
        // TODO : clear cart after order
        // TODO : on server change the stock number of items 
      }
      else{
        alert('Enter Address and Payment method')
      }
    }



   useEffect(()=>{
    dispatch(fecthOrdersAsync());
   },[dispatch]);

  return (


    <>
    {!Items.length && <Navigate to='/' replace={true}></Navigate>}
    {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
   <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5 mt-14">
   <div className="lg:col-span-3">

    <form noValidate className='bg-white px-5 py-5'  onSubmit={handleSubmit((data)=>{
            console.log('Form data is : ',data);
            dispatch(updateUserAsync({...user,addresses:[...user.addresses,data]}));
            
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
                  type="tel"
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
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Reset
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Add New
        </button>
         </div> 

         
          <div className="border-b border-gray-900/10 pb-12 mt-10">
          <h2 className="text-base font-semibold leading-7 text-gray-900">Existing Addresses</h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Choose From Existing Address
          </p>


          <ul role="list" className="divide-y divide-gray-100">
      {user.addresses.map((address,index) => (

        <div className="flex items-center gap-x-3" key={index}>
                  <input
                    onClick={handleAddress}
                    name="address"
                    type="radio"
                    value={index}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                  <li key={address.email} className="flex justify-between gap-x-6 py-5">
        
                     <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">name : {address.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Email:{address.email}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">pinCode : {address.pinCode}</p>
                     </div>
        
                     <div className="flex min-w-0 gap-x-4">
                      <p className="text-sm leading-6 text-gray-900">Phone : {address.phone}</p>
                      <p className="text-sm leading-6 text-gray-900">Address : {`${address.street},  ${address.city} , ${address.state}, ${address.pinCode}`}</p>
                     </div>
                   </li> 
                  </label>
                   </div>
       

      ))}
    </ul>
   
    

          <div className="mt-10 space-y-10">
           
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Methods</legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">Choose One.</p>
              <div className="mt-6 space-y-6">
                <div className="flex items-center gap-x-3">
                  <input
                    id="cash"
                    name="payments"
                    onClick={handlePayment}
                    type="radio"
                   
                    value="cash"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                    Cash
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="card"
                    name="payments"
                    type="radio"
                    onClick={handlePayment}
        
                    value="card"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Payment
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="upi"
                    name="payments"
                    type="radio"
                    onClick={handlePayment}
            
                    value="UPI"
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                    UPI Payment
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>


        </div>
        {/* <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div> */}
    </form>
    </div>

    <div className="lg:col-span-2">
    <div className="mx-auto max-w-7xl  bg-white px-8 sm:px-4 lg:px-6">
   
             <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {Items && Items.map((item) => (
                          <li key={item.product.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={item.product.thumbnail}
                                src={item.product.images[0]}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={item.product.href}>{item.product.name}</a>
                                  </h3>
                                  <p className="ml-4">{discountedPrice(item.product)}</p>
                                </div>
                                {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                <label htmlFor="password" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                                Qty
                                </label>
                                <select onChange={(e)=>handleQuantity(e,item)} value={item.quantity}>
                                  <option value="1">1</option>
                                  <option value="2">2</option>
                                  <option value="3">3</option>
                                  <option value="4">4</option>
                                  <option value="5">5</option>
                                  <option value="6">6</option>
                                </select>
                               </div>

                                <div className="flex">
                                  <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500"
                                  onClick={(e)=>handleRemove(e,item.product.id)}>
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>


                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium my-2 text-gray-900">
                    <p>Subtotal</p>
                    <p>${Math.round(TotalAmount)}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium my-2 text-gray-900">
                    <p>Total Items In Cart</p>
                    <p>{totalItems} items</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                  <div className="mt-6">

                  <div 
                      onClick={handleOrder}
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Pay And Order
                  
                    </div>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{' '}
                     <Link to='/'>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                    </p>
                  </div>
                </div>
       </div>
   
    </div>
    </div>
    </div>

    </>
  )
}


export default Checkout;
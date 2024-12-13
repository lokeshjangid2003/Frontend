import { useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from "../userSlice";

import { Link } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { selectLoggedInUser } from "../../Auth/authSlice";
import { discountedPrice } from "../../../app/constant";

function UserOrders(){

  const dispatch=useDispatch();
  const user=useSelector(selectUserInfo);
  console.log('user is is : ',user);
  const orders=useSelector(selectUserOrders);
  console.log('orders is is: ',orders);

  useEffect(()=>{
    dispatch(fetchLoggedInUserOrdersAsync(user?.id))
  },[dispatch,user]);

  return<>
  <div>
  {
    orders && orders.map((order)=>(
      <div>
            <div className="mx-auto max-w-7xl  bg-white px-8 sm:px-4 lg:px-8">
   
             <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  
                  <div className="mt-8">
                    
                    <div className="flow-root">
                   <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                      Order Number : {order.id}
                    </h1>
                   <h3 className="text-4xl my-5 font-bold tracking-tight text-red-900">
                      Order Status : {order.status}
                    </h3>
                      <ul role="list" className="-my-6 divide-y divide-gray-200">
                        {order && order.items && order.items.map((item) => (
                          <li key={item.id} className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                alt={item.product.imageAlt}
                                src={item.product.images[0]}
                                className="h-full w-full object-cover object-center"
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <a href={item.product.href}>{item.product.title}</a>
                                  </h3>
                                  <p className="ml-4">{discountedPrice(item.product)}</p>
                                </div>
                                {/* <p className="mt-1 text-sm text-gray-500">{item.color}</p> */}
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                <label htmlFor="password" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                                Qty : {item.quantity}
                                </label>
                               
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
                    <p>${Math.round(order.TotalAmount)}</p>
                  </div>
                  <div className="flex justify-between text-base font-medium my-2 text-gray-900">
                    <p>Total Items In Cart</p>
                    <p>{order.totalItems} items</p>
                  </div>
                  <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">Address : </p>
                  </div>
           <ul role="list" className="divide-y divide-gray-100">
              
               <div className="flex items-center gap-x-3" key={order.id}>
                  
                  <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                  <li key={order.selectedAddress.email} className="flex justify-between gap-x-6 py-5">
        
                     <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">name : {order.selectedAddress.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">Email:{order.selectedAddress.email}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">pinCode : {order.selectedAddress.pinCode}</p>
                     </div>
        
                     <div className="flex min-w-0 gap-x-4">
                      <p className="text-sm leading-6 text-gray-900">Phone : {order.selectedAddress.phone}</p>
                      <p className="text-sm leading-6 text-gray-900">Address : {`${order.selectedAddress.street},  ${order.selectedAddress.city} , ${order.selectedAddress.state}, ${order.selectedAddress.pinCode}`}</p>
                     </div>
                   </li> 
                  </label>
                   </div>
       

              
            </ul>
                </div>
           </div>

      </div>   
    ))
   
  }
  </div>
  </>
}

export default UserOrders;

import { useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {deleteItemFromCartAsync, selectAllCarts, updateToCartAsync} from './cartSlice'
import { Navigate } from 'react-router-dom'
import { discountedPrice } from '../../app/constant'
// const Items = [
//   {
//     id: 1,
//     name: 'Throwback Hip Bag',
//     href: '#',
//     color: 'Salmon',
//     price: '$90.00',
//     quantity: 1,
//     images[0]: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
//     imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
//   },
//   {
//     id: 2,
//     name: 'Medium Stuff Satchel',
//     href: '#',
//     color: 'Blue',
//     price: '$32.00',
//     quantity: 1,
//     images[0]: 'https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
//     imageAlt:
//       'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
//   }
// ]


function Cart() {
 
  const [open, setOpen] = useState(true)

  const Items=useSelector(selectAllCarts);

  const TotalAmount=Items.reduce((total,item)=>discountedPrice(item.product)*item.quantity+total,0);

  const totalItems=Items.reduce((total,item)=>item.quantity+total,0)

  const dispatch=useDispatch();

  function handleQuantity(e,item){
    dispatch(updateToCartAsync({id:item.id,quantity: +e.target.value}))
  }

  function handleRemove(e,id){
    dispatch(deleteItemFromCartAsync(id));
  }
  return (
   <>
   {!Items.length && <Navigate to='/' replace={true}></Navigate>}
   <div className="mx-auto max-w-7xl  bg-white px-8 sm:px-4 lg:px-8">
   
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
                          <li key={item.id} className="flex py-6">
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
                                  onClick={(e)=>handleRemove(e,item.id)}>
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

                  <Link to="/checkout"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                  

                    </Link>
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
   </>
  );
}


export default Cart;
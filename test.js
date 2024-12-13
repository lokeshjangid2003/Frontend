<div className="mx-auto max-w-7xl bg-white px-8 sm:px-4 lg:px-4">
   
<div className="flex-1 overflow-y-auto px-0 py-5 sm:px-0">
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
           {products.map((product) => (
             <li key={product.id} className="flex py-6">
               <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                 <img
                   alt={product.imageAlt}
                   src={product.imageSrc}
                   className="h-full w-full object-cover object-center"
                 />
               </div>

               <div className="ml-4 flex flex-1 flex-col">
                 <div>
                   <div className="flex justify-between text-base font-medium text-gray-900">
                     <h3>
                       <a href={product.href}>{product.name}</a>
                     </h3>
                     <p className="ml-4">{product.price}</p>
                   </div>
                   {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
                 </div>
                 <div className="flex flex-1 items-end justify-between text-sm">
                   <div className="text-gray-500">
                   <label htmlFor="password" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                   Qty
                   </label>
                   <select>
                     <option value={1}>1</option>
                     <option value={2}>2</option>
                     <option value={3}>3</option>
                   </select>
                  </div>

                   <div className="flex">
                     <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
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


   <div className="border-t border-gray-200 px- py-6 sm:px-6">
     <div className="flex justify-between text-base font-medium text-gray-900">
       <p>Subtotal</p>
       <p>$262.00</p>
     </div>
     <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
     <div className="mt-6">

     <Link to="/pay">

       <a
         href="#"
         className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
       >
         Pay and Order
       </a>

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
import { useDispatch, useSelector } from "react-redux";
import { fetchAllOrderAsync, selectOrders, selectTotalNoOfOrders, updateOrderAsync } from "../../orders/orderSlice";
import { useEffect, useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";
import { discountedPrice, ITEMS_PER_PAGE } from "../../../app/constant";
import { updateOrder } from "../../orders/orderAPI";
import Pagination from "../../common/Pagination";

function AdminOrders(){

  
  const dispatch=useDispatch();
  const orders=useSelector(selectOrders);
  const totalorders=useSelector(selectTotalNoOfOrders);

  const [page,setPage]=useState(1);
  const [editableOrderId,setEditableOrderId]=useState(-1);


  const chooseColor=(status)=>{
    switch(status){
      case 'pending':
        return 'pg-purple-200 text-purple-600';
      case 'dispatched':
        return 'pg-yellow-200 text-yellow-600';
      case 'delivered':
        return 'pg-green-200 text-green-600';
      case 'cancelled':
        return 'pg-red-200 text-red-600';
      default:
        return 'pg-purple-200 text-purple-600';
    }
  }
  
  const handleSort=()=>{
     
  }


  function handleShow(order){
    console.log(order);
  }
  
  function handleEdit(order){
    setEditableOrderId(order.id);
  }
  
  function handleUpdate(e,order){
    console.log("e.target.value : ",e.target.value);
    const updatedOrder={...order,status:e.target.value};
    
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  }
  
  const handlePage=(page)=>{
    setPage(page);
    const pagination={_page:page,_limit:ITEMS_PER_PAGE};
    dispatch(fetchAllOrderAsync(pagination))
  }
  
  useEffect(()=>{
      handlePage();
    // TODO :server will filter deleted products
  },[dispatch,handlePage]);


  return <>
  {/* component */}
  <div className="overflow-x-auto">
    <div className= " bg-gray-100 flex items-center justify-center bg-gray-100 font-sans overflow-hidden">
      <div className="">
        <div className="bg-white shadow-md rounded my-6">
          <table className="w-full table-auto">
            <thead>   
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left" onClick={e=>handleSort('id')}>Order Number</th>
                <th className="py-3 px-6 text-left">Items</th>
                <th className="py-3 px-6 text-center">Total Amount</th>
                <th className="py-3 px-6 text-center">Shipping Address</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>


            {orders.map((order)=><tbody className="text-gray-600 text-sm font-light">
              <tr className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="mr-2">
                    </div>
                    <span className="font-medium">{order.id}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left">
                {order.products.map((product)=>
                  <div className="flex items-center">
                    <div className="mr-2">
                      <img
                        className="w-6 h-6 rounded-full"
                        src={product.thumbnail}
                      />
                    </div>
                    <span>{product.title}-#{product.quantity}-${discountedPrice(product)}</span>
                  </div>)}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex items-center justify-center">
                  ${order.TotalAmount}
                  </div>
                </td>
                <td className="py-3 px-6 text-center">
                  <div>
                  <div>
                  <strong>{order.selectedAddress.name}</strong>
                  </div>
                  <div>
                  {order.selectedAddress.email},
                 </div>
                 <div>
                  {order.selectedAddress.phone},
                 </div>  
                 <div>
                   {order.selectedAddress.city},
                  </div>
                 <div>
                  {order.selectedAddress.street},
                 </div>
                 <div>
                  {order.selectedAddress.state},
                 </div>
                 <div>
                  {order.selectedAddress.pinCode}
                 </div>
                 </div>
                </td>
                <td className="py-3 px-6 text-center">
                 {order.id === editableOrderId ?
                  (
                  <select onChange={e=>handleUpdate(e,order)}>
                  <option>Enter Status</option>
                  <option value="pending">Pending</option>
                  <option value="dispatched">Dispatched</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancle</option>
                  </select> ): (<span className={`${chooseColor(order.status)} py-1 px-3 rounded-full text-xs`}>
                    {order.status}
                  </span>
                  )}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <div className="w-6 mr-3 transform hover:text-purple-500 hover:scale-110">
                    <FaRegEye className="w-6 h-6" onClick={(e)=>handleShow(order)}/>
                    </div>
                    <div className="w-6 mr-3 transform hover:text-purple-500 hover:scale-110">
                    <MdModeEditOutline className="w-5 h-5" onClick={()=>handleEdit(order)} />
                    </div>
                    
                  </div>
                </td>
              </tr>
             
            </tbody>)}


          </table>
        </div>
      </div>
    </div>
    <Pagination page={page} setPage={setPage} handlePage={handlePage} totalItems={totalorders}></Pagination>
  </div>
</>
}

export default AdminOrders;
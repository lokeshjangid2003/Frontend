export function createOrder(order) {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/orders',{
      method:'POST',
      body:JSON.stringify(order),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});
  }
  );
}


export function updateOrder(order) {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/orders/'+order.id,{
      method:'PATCH',
      body:JSON.stringify(order),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});
  }
  );
}


export function fecthOrders(){
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/orders');
    const data=await response.json();
    resolve({data});
  }
  );
}




export function fetchAllOrders({pagination}) {
  let queryString='';  
  for(let key in pagination){
    queryString+=`${key}=${pagination[key]}&`;
  }
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/orders?'+queryString);
    const totalOrders = response.headers.get('x-total-count');
    console.log("total items",totalOrders);
    const data=await response.json();
    resolve({data: {orders:data,totalOrders:10}});
  }
  );
};




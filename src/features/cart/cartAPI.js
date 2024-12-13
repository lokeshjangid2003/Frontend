// A mock function to mimic making an async request for data
export function addToCarts(cartData) {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/cart',{
      method:'POST',
      body:JSON.stringify(cartData),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});
  }
  );
}


export function updateCart(item) {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/cart/'+item.id,{
      method:'PATCH',
      body:JSON.stringify(item),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});
  }
  );
}

export function fetchItemsByUserID(userId){
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:8080/cart?user='+userId);
    const data=await response.json();
    console.log('data server api :  ',data);
    resolve({data});
  });
}


export function deleteItemFromCart(itemId){
  console.log('itemId is  : ',itemId);
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:8080/cart/'+itemId,{
      method:'DELETE',
      headers:{'content-type':'application-json'},
    })
    const data=await response.json();
    resolve({data:{id:itemId}});
  });
}


export function resetCart(userId){
  // get the all the item and delete each of them
  return new Promise(async (resolve)=>{
    console.log('user if in async : ',userId);
    const response = await fetchItemsByUserID(userId);
    const items=response.data;
    console.log('items we got : ',items);
    for(let item of items){
      await deleteItemFromCart(item.id);
    }
    resolve({status:'success'})
  })
}
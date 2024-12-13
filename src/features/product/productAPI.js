// A mock function to mimic making an async request for data


export function fetchAllProducts() {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/products');
    const {data}=await response.json();
    resolve(data);
  }
  );
};


export function createProduct(product) {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/products/',{
      method:'POST',
      body:JSON.stringify(product),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});
  }
);
};

export function updateProduct(update) {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/products/'+update.id,{
      method:'PATCH',
      body:JSON.stringify(update),
      headers:{'content-type':'application/json'}
    });
    const data=await response.json();
    resolve({data});
  }
  );
}

export function fetchProductById(id){
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:8080/products/'+id);
    const data=await response.json();
    resolve({data});
  })
}





export function fetchProdcutsByFilters({filter,sort,pagination}) {
  // filter = {"category":"smartphone"}
  // sort ={_sort:"price",_order:"desc"}
  // pagination={_page:1,_limit=10} // _page=1&_limit=10
  
  // let queryString='';
  // for(let key in filter){
  //   const categoryValues=filter[key];
  //   if(categoryValues.length>0){
  //     const lastCategoryValue=categoryValues[categoryValues.length-1];
  //     // filter={"category":["laptops","beauty","frangnance"]}
  //     queryString+=`${key}=${lastCategoryValue}&`
  //     // & isliye put kiya taki ye ek se jayda chijo ko handle kr ske
  //   }
  // }

  // for(let key in sort){
  //   queryString+=`${key}=${sort[key]}&`;
  // }

  // for(let key in pagination){
  //   queryString+=`${key}=${pagination[key]}&`;
  // }
   // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  // pagination = {_page:1,_limit=10}

  let queryString = '';
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length) {
      queryString += `${key}=${categoryValues}&`;
    }
  }
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  console.log("queryString is : ",queryString);

  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/products?'+queryString);
    const totalCount = await response.headers.get('X-Total-Count');
    const data=await response.json();
    console.log("products data is  : ",data);
    console.log("total count of Products : ",totalCount);
    resolve({products:data,totalItems:102});
  }
  );
};


export function fetchCategories(){
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:8080/category');
    const data=await response.json();
    resolve({data});
  })
};


export function fetchBrands(){
  return new Promise(async (resolve)=>{
    const response=await fetch('http://localhost:8080/brands');
    const data=await response.json();
    resolve({data});
  })
}




 export function createUser(userData) {
  return new Promise(async (resolve) =>{
    const response=await fetch('http://localhost:8080/auth/signin',
      {
        method:'POST',
        body:JSON.stringify(userData),
        headers:{'content-type':'application/json'}
      }
    );
    const data=await response.json();
    // TODO : on server it will return only some information of user(not password)

    resolve({data});
  }
  );
}




export function checkUser(loginInfo){
  return new Promise(async (resolve,reject)=>{
    try{
      const response=await fetch(`http://localhost:8080/auth/login`, {
        method:'POST',
        body:JSON.stringify(loginInfo),
        headers:{'content-type':'application/json'}
      });
      if(response.ok){
        const data=await response.json();
        console.log("data of response is : ",data);
        resolve({data:data});
      }else{
        const error=await response.json();
        reject(error);
      }
    }
    catch(error){
      console.log('error occuring here');
      reject(error);
    }
     
  })
}


export function signOut(){
  return new Promise((resolve)=>{
    //TODO : on server we will remove user session info
    resolve({data:'success'});
  })
}

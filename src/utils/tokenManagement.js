const getToken =()=>{
    if (typeof localStorage !== 'undefined') {
        return JSON.parse(localStorage.getItem('userToken')) || null;
      }
      return null;
}

const setToken =(token)=>{
   localStorage.setItem('userToken',JSON.stringify(token));
    }

const deleteToken =()=>{
    localStorage.removeItem('userToken');
}

export {getToken,setToken,deleteToken};
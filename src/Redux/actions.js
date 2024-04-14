import axios from "axios"
import { GET_EXPENSES_DATA_FAILURE, GET_EXPENSES_DATA_REQUEST, GET_EXPENSES_DATA_SUCCESS, GET_PROPERTY_DATA_FAILURE, GET_PROPERTY_DATA_REQUEST, GET_PROPERTY_DATA_SUCCESS, GET_TENANTS_DATA_FAILURE, GET_TENANTS_DATA_REQUEST, GET_TENANTS_DATA_SUCCESS, GET_VACANT_PROPERTY_DATA_FAILURE, GET_VACANT_PROPERTY_DATA_REQUEST, GET_VACANT_PROPERTY_DATA_SUCCESS, LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_FAILURE, REGISTER_REQUEST, REGISTER_SUCCESS } from "./actionTypes"
















export const registerUser=(formData)=>(dispatch)=>{
  dispatch({type:REGISTER_REQUEST})
  axios.post('http://localhost:8080/users',formData)
  .then((res)=>{
    console.log(res.data)
    dispatch({type:REGISTER_SUCCESS,payload:res.data})
  })
  .catch(error=>{

    console.log(error)
    dispatch({type:REGISTER_FAILURE,})
  })
}








// export const loginUser=(formData)=>(dispatch)=>{
//   return new Promise((resolve,reject)=>{

 
//   dispatch({type:LOGIN_REQUEST})
//   axios.get('http://localhost:8080/users')
//   .then((res)=>{
//     console.log(res.data)
//   let allow=res.data.find((el)=>
// el.email==formData.email && el.password==formData.password 
//   )
// console.log(allow)
// let token=Math.random();
// if(allow){
//   resolve (true)
//   dispatch({type:LOGIN_SUCCESS,payload:token})
// }
// else{
//   alert("Invalid Credentials,Please Check the credentials")
// }
//     // dispatch({type:LOGIN_SUCCESS,payload:res.data})
//   })
//   .catch(error=>{
//     resolve (false)

//     console.log(error)
//     dispatch({type:LOGIN_FAILURE,})
//   })
// })
// }

export const loginUser = (formData) => (dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch({ type: LOGIN_REQUEST });
    axios.get('http://localhost:8080/users')
      .then((res) => {
        console.log(res.data);
        let user = res.data.find((el) =>
          el.email === formData.email && el.password === formData.password
        );
        console.log(user);
        if (user) {
          // Check if the user is an admin
          if (user.isAdmin) {
            // If the user is an admin, dispatch success action with isAdmin true
            dispatch({ type: LOGIN_SUCCESS, payload: { isAdmin: true } });
            resolve(true);
          } else {
            // For regular users, dispatch success action with isAdmin false
            dispatch({ type: LOGIN_SUCCESS, payload: { isAdmin: false } });
            resolve(true);
          }
        } else {
          alert("Invalid Credentials, Please check the credentials.");
          reject(false);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({ type: LOGIN_FAILURE });
        reject(false);
      });
  });
};


 export const userLogout=(dispatch)=>{
  dispatch({type:LOGOUT_SUCCESS})
}


export const fetchProperties = () => async (dispatch) => {
  dispatch({ type: GET_PROPERTY_DATA_REQUEST }); // Dispatch a request action

  try {
    const response = await axios.get("https://landloards-json-server.onrender.com/properties");
    dispatch({ type: GET_PROPERTY_DATA_SUCCESS, payload: response.data }); // Dispatch a success action with fetched data
  } catch (error) {
    dispatch({ type: GET_PROPERTY_DATA_FAILURE }); // Dispatch a failure action
    console.error("Error fetching properties:", error);
  }
};


export const fetchTenants = () => async (dispatch) => {
  dispatch({ type: GET_TENANTS_DATA_REQUEST });
  try {
    const response = await axios.get("https://landloards-json-server.onrender.com/tenants");
    dispatch({ type: GET_TENANTS_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching tenants:", error);
    dispatch({ type: GET_TENANTS_DATA_FAILURE });
  }
};

export const fetchExpenses = () => async (dispatch) => {
  dispatch({ type: GET_EXPENSES_DATA_REQUEST });
  try {
    const response = await axios.get("https://landloards-json-server.onrender.com/expenses");
    dispatch({ type: GET_EXPENSES_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    dispatch({ type: GET_EXPENSES_DATA_FAILURE});
  }
}
  
export const fetchVacantProperty = () => async (dispatch) => {
  dispatch({ type: GET_VACANT_PROPERTY_DATA_REQUEST });
  try {
    const response = await axios.get("https://landloards-json-server.onrender.com/vacant_properties");
    dispatch({ type: GET_VACANT_PROPERTY_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    dispatch({ type: GET_VACANT_PROPERTY_DATA_FAILURE});
  }
}

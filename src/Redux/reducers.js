
import {  GET_EXPENSES_DATA_FAILURE, GET_EXPENSES_DATA_REQUEST, GET_EXPENSES_DATA_SUCCESS, GET_PROPERTY_DATA_FAILURE, GET_PROPERTY_DATA_REQUEST, GET_PROPERTY_DATA_SUCCESS, GET_TENANTS_DATA_FAILURE, GET_TENANTS_DATA_REQUEST, GET_TENANTS_DATA_SUCCESS, GET_VACANT_PROPERTY_DATA_FAILURE, GET_VACANT_PROPERTY_DATA_REQUEST, GET_VACANT_PROPERTY_DATA_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS } from "./actionTypes";



const initialUserState = {
  isloading: false,
  iserror: false,
  isAuth: false,
  token: null,
  users: [],
  properties:[],
  tenants:[],
  expenses:[],
  VacantProperties:[],
};

export const authReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return { ...state, isloading: false, iserror: false, users: [action.payload] }

    case LOGIN_SUCCESS:
      return { ...state, isloading: false, iserror: false, isAuth: true, token: action.payload }
 
      case LOGOUT_SUCCESS:
  return { ...state, isloading: false, iserror: false, isAuth: false,token:null }


//proper
     case  GET_PROPERTY_DATA_REQUEST:
      return { ...state, isloading: true, iserror: false}

     case GET_PROPERTY_DATA_SUCCESS:
      return { ...state, isloading: false, iserror: false, properties: action.payload}
      
      case GET_PROPERTY_DATA_FAILURE:
        return { ...state, isloading: false, iserror: true, properties:[]}

//tenants
case  GET_TENANTS_DATA_REQUEST:
  return { ...state, isloading: true, iserror: false}

 case GET_TENANTS_DATA_SUCCESS:
  return { ...state, isloading: false, iserror: false, tenants: action.payload}
  
  case GET_TENANTS_DATA_FAILURE:
    return { ...state, isloading: false, iserror: true, tenants:[]}

//expenses
case  GET_EXPENSES_DATA_REQUEST:
  return { ...state, isloading: true, iserror: false}

 case GET_EXPENSES_DATA_SUCCESS:
  return { ...state, isloading: false, iserror: false, expenses: action.payload}
  
  case GET_EXPENSES_DATA_FAILURE:
    return { ...state, isloading: false, iserror: true, expenses:[]}


//vacant_Property
case  GET_VACANT_PROPERTY_DATA_REQUEST:
  return { ...state, isloading: true, iserror: false}

 case GET_VACANT_PROPERTY_DATA_SUCCESS:
  return { ...state, isloading: false, iserror: false, VacantProperties: action.payload}
  
  case GET_VACANT_PROPERTY_DATA_FAILURE:
    return { ...state, isloading: false, iserror: true, VacantProperties:[]}

    default:
      return state;
  }
};

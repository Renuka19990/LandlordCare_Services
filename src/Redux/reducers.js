
import {  GET_EXPENSES_DATA_FAILURE, GET_EXPENSES_DATA_REQUEST, GET_EXPENSES_DATA_SUCCESS, GET_PROPERTY_DATA_FAILURE, GET_PROPERTY_DATA_REQUEST, GET_PROPERTY_DATA_SUCCESS, GET_TENANTS_DATA_FAILURE, GET_TENANTS_DATA_REQUEST, GET_TENANTS_DATA_SUCCESS, GET_VACANT_PROPERTY_DATA_FAILURE, GET_VACANT_PROPERTY_DATA_REQUEST, GET_VACANT_PROPERTY_DATA_SUCCESS, LOGIN_SUCCESS, LOGOUT_SUCCESS, REGISTER_SUCCESS, SORT_PROPERTIES_HIGH_TO_LOW, SORT_PROPERTIES_LOW_TO_HIGH, UPDATE_CURRENT_PAGE } from "./actionTypes";



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
  currentPage: 1, 
  totalPages: 10

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
      return { ...state, isloading: false, iserror: false, properties: action.payload.properties,totalPages: action.payload.totalPages}
      
      case GET_PROPERTY_DATA_FAILURE:
        return { ...state, isloading: false, iserror: true, properties:[]}

        case UPDATE_CURRENT_PAGE:
          return { ...state, currentPage: action.payload };
          case SORT_PROPERTIES_HIGH_TO_LOW:
            return { ...state, properties: state.properties.slice().sort((a, b) => b.Rent - a.Rent) };
          
          case SORT_PROPERTIES_LOW_TO_HIGH:
            return { ...state, properties: state.properties.slice().sort((a, b) => a.Rent - b.Rent) };

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

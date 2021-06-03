import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      // her defasında girdiğimizde local storage kaydetmek

      return { ...state, authData: action?.data };
     case actionType.LOGOUT:
       localStorage.clear(); //temizler

       return { ...state, authData: null};
    default:
      return state;
  }
};

export default authReducer;
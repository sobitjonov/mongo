import {
  GET_EMPLOYEES,
  DELETE_EMPLOYEE,
  ADD_EMPLOYEE
} from "../actions/types.js";

const initialState = {
  employees: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        employees: action.payload
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(
          employee => employee.id !== action.payload
        )
      };
    case ADD_EMPLOYEE:
      return {
        ...state,
        employees: [...state.employees, action.payload]
      };
    default:
      return state;
  }
}

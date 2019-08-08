import axios from "axios";

import { GET_EMPLOYEES, DELETE_EMPLOYEE, ADD_EMPLOYEE } from "./types";
import { createMessage, returnErrors } from "../actions/messages";
import { tokenConfig } from "./auth";
// get employees
export const getEmployees = (sortname, sorttype, lastname) => (
  dispatch,
  getState
) => {
  let headandparams = tokenConfig(getState);
  headandparams.params = {};
  headandparams.params.lastname = lastname;
  headandparams.params.sort_item = sortname;
  headandparams.params.sort_type = sorttype;
  axios
    .get("/api/auth/allusers", headandparams)
    .then(res => {
      dispatch({
        type: GET_EMPLOYEES,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// delete employee
export const deleteEmployee = id => (dispatch, getState) => {
  axios
    .delete(`/api/auth/delete/${id}`, tokenConfig(getState))
    .then(res => {
      dispatch(createMessage({ deletedEmployee: "Employee deleted" }));
      dispatch({
        type: DELETE_EMPLOYEE,
        payload: id
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

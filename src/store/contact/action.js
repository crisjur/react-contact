import { api } from "../../services/api";

export const contactActionTypes = {
  GET_CONTACTS_START: "GET_CONTACTS_START",
  GET_CONTACTS_SUCCESS: "GET_CONTACTS_SUCCESS",
  GET_CONTACTS_FAILURE: "GET_CONTACTS_FAILURE",
  GET_CONTACTS_SUCCESS_PAGE: "GET_CONTACTS_SUCCESS_PAGE",
  GET_CONTACTS_INIT: "GET_CONTACTS_INIT",
  SET_CONTACTS_FILTER: "SET_CONTACTS_FILTER",
}

export const getContacts = (page = 1, query='', countryId='') => dispatch => {
  dispatch({ type: contactActionTypes.GET_CONTACTS_START })
  api.get(`contacts.json?companyId=${171}&page=${page}&query=${query}&countryId=${countryId}`)
      .then(res => {
        const { data } = res;
        if (page > 1) {
          dispatch({ type: contactActionTypes.GET_CONTACTS_SUCCESS_PAGE, payload: data })
        } else {
          dispatch({ type: contactActionTypes.GET_CONTACTS_SUCCESS, payload: data })
        }
      })
      .catch(e => {
        console.log(e)
        dispatch({ type: contactActionTypes.GET_CONTACTS_FAILURE, payload: 'Fetch data failure' })
      })
};

export const initContact = () => dispatch => {
  dispatch({ type: contactActionTypes.GET_CONTACTS_INIT })
}

export const setFilterEven = (even) => dispatch => {
  dispatch({ type: contactActionTypes.SET_CONTACTS_FILTER, payload: even })
}

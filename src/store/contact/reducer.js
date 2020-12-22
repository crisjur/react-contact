import { contactActionTypes } from "./action";

const defaultState = () => ({
  isLoading: false,
  error: null,
  contacts: {},
  contacts_ids: [],
  total: 0,
  filter: {
    even: false
  }
});

const initialState = { ...defaultState() };

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case contactActionTypes.GET_CONTACTS_SUCCESS:
      return { ...state, ...action.payload, isLoading: false };
    case contactActionTypes.GET_CONTACTS_SUCCESS_PAGE:
      return {
        ...state,
        contacts: { ...state.contacts, ...action.payload.contacts},
        contacts_ids: [ ...state.contacts_ids, ...action.payload.contacts_ids],
        isLoading: false
      };
    case contactActionTypes.GET_CONTACTS_START:
      return { ...state, isLoading: true };
    case contactActionTypes.GET_CONTACTS_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case contactActionTypes.SET_CONTACTS_FILTER:
      return { ...state, isLoading: false, filter: { ...state.filter, even: action.payload } };
    case contactActionTypes.GET_CONTACTS_INIT:
      return initialState;
    default:
      return state;
  }
}

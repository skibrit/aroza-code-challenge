import {
  GET_COUNTRIES,
  GET_COUNTRIES_ERROR,
  GET_COUNTRY_BY_CODE,
  CLEAR_COUNTRY,
  SET_CURRENT_PAGE
} from "../actions/constants";

const defaultState = {
  countryList: [],
  error: {},
  isLoading: true,
  country: {},
  currentPage: 0,
  isListFetched: false
};

export default (state = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COUNTRIES:
      return {
        ...state,
        countryList: payload,
        isLoading: false,
        isListFetched: true
      };
    case GET_COUNTRY_BY_CODE:
      return {
        ...state,
        country: payload,
        isLoading: false
      };
    case CLEAR_COUNTRY:
      return { ...state, country: {}, isLoading: true };
    case GET_COUNTRIES_ERROR:
      return {
        ...state,
        error: payload,
        isLoading: false,
        isListFetched: true
      };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: payload };
    default:
      return state;
  }
};

import {
  GET_COUNTRIES,
  GET_COUNTRIES_ERROR,
  GET_COUNTRY_BY_CODE,
  CLEAR_COUNTRY,
  SET_CURRENT_PAGE
} from "./constants";
import axios from "axios";

export const getCountries = () => async dispatch => {
  try {
    const result = await axios.get(
      "https://countriesnode.herokuapp.com/v1/countries"
    );

    dispatch({
      type: GET_COUNTRIES,
      payload: result.data
    });

    dispatch(clearCountry());
  } catch (err) {
    console.log(err);
    if (err.response) {
      dispatch({
        type: GET_COUNTRIES_ERROR,
        payload: { status: err.response.status, message: err.response.message }
      });
    } else {
      dispatch({
        type: GET_COUNTRIES_ERROR,
        payload: { status: 400, message: err.toString() }
      });
    }
  }
};

export const getCountryByCode = code => async dispatch => {
  try {
    const result = await axios.get(
      `https://countriesnode.herokuapp.com/v1/countries/${code}`
    );
    dispatch({
      type: GET_COUNTRY_BY_CODE,
      payload: result.data
    });
  } catch (err) {
    console.log(err);
    if (err.response) {
      dispatch({
        type: GET_COUNTRIES_ERROR,
        payload: { status: err.response.status, message: err.response.message }
      });
    } else {
      dispatch({
        type: GET_COUNTRIES_ERROR,
        payload: { status: 400, message: err.toString() }
      });
    }
  }
};

export const changePageNum = page => dispatch => {
  dispatch({
    type: SET_CURRENT_PAGE,
    payload: page
  });
};

export const clearCountry = () => dispatch => {
  dispatch({
    type: CLEAR_COUNTRY,
    payload: {}
  });
};

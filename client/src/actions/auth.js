import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const signin = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);

    dispatch({ type: AUTH, data });

    router.push('/');
  } catch (error) {
    console.log(error);
  }
};

export const signupGoogle = (formData, router) => async (dispatch) => {
  try {
    const { data } = await api.signUpGoogle(formData);
    console.log(data)
    console.log("Signing up Google")
    dispatch({ type: AUTH, data });

    window.location.href="/"
  } catch (error) {
    console.log(error);
  }
};
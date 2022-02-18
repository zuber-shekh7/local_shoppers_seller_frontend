import backendAPI from "../apis/backendAPI";
import {
  SELLER_LOGIN_FAIL,
  SELLER_LOGIN_REQUEST,
  SELLER_LOGIN_SUCCESS,
  SELLER_LOGOUT_FAIL,
  SELLER_LOGOUT_REQUEST,
  SELLER_LOGOUT_SUCCESS,
  SELLER_SIGNUP_FAIL,
  SELLER_SIGNUP_REQUEST,
  SELLER_SIGNUP_SUCCESS,
} from "../constants/seller";

const sellerLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: SELLER_LOGIN_REQUEST });

    const { data } = await backendAPI.post("/sellers/login", {
      email,
      password,
    });

    const { seller, token } = data;

    localStorage.setItem("seller", JSON.stringify(seller));
    localStorage.setItem("token", JSON.stringify(token));

    dispatch({ type: SELLER_LOGIN_SUCCESS, payload: seller });
  } catch (err) {
    const error = err.response ? err.response.data.message : err.message;
    dispatch({ type: SELLER_LOGIN_FAIL, payload: error });
  }
};

const sellerSignup =
  (email, password, firstName, lastName, mobile) => async (dispatch) => {
    try {
      dispatch({ type: SELLER_SIGNUP_REQUEST });

      const { data } = await backendAPI.post("/sellers/signup", {
        email,
        password,
        firstName,
        lastName,
        mobile,
      });

      dispatch(sellerLogin(email, password));

      dispatch({ type: SELLER_SIGNUP_SUCCESS, payload: data });
    } catch (err) {
      const error = err.response ? err.response.data.message : err.message;
      dispatch({ type: SELLER_SIGNUP_FAIL, payload: error });
    }
  };

const sellerLogout = () => async (dispatch) => {
  try {
    dispatch({ type: SELLER_LOGOUT_REQUEST });

    localStorage.clear();

    dispatch({ type: SELLER_LOGOUT_SUCCESS, payload: null });
  } catch (err) {
    const error = err.response ? err.response.data.message : err.message;
    dispatch({ type: SELLER_LOGOUT_FAIL, payload: error });
  }
};

export { sellerLogin, sellerSignup, sellerLogout };

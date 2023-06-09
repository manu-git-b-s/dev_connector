import axios from "axios";
import { setAlert } from "./alert";
import { ACCOUNT_DELETED, CLEAR_PROFILE, GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./types";

// get current users profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = axios.get("/api/profile/me");
    dispatch({ type: GET_PROFILE, payload: res.data });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

// Create or update a profile
export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await axios.post("/api/profile", formData, config);
      dispatch({ type: GET_PROFILE, payload: res.data });
      dispatch(setAlert(edit ? "Profile Updated" : "Profile created", "success"));
      if (!edit) {
        history.push("/dashboard");
      }
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      }
      dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
    }
  };

// Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/experience", formData, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Experience added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const res = await axios.put("/api/profile/education", formData, config);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Education added", "success"));
    history.push("/dashboard");
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

// Delet experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = axios.delete(`/api/profile/experience/${id}`);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Experience removed", "success"));
  } catch (err) {
    dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

// Delet education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = axios.delete(`/api/profile/education/${id}`);
    dispatch({ type: UPDATE_PROFILE, payload: res.data });
    dispatch(setAlert("Education removed", "success"));
  } catch (err) {
    dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
  }
};

// Delete account and profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This cannot be undone")) {
    try {
      const res = axios.delete("/api/profile");
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert("Your account has been permanently deleted"));
    } catch (err) {
      dispatch({ type: PROFILE_ERROR, payload: { msg: err.response.statusText, status: err.response.status } });
    }
  }
};

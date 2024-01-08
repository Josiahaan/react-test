import { FETCH_ARTICLES, LOADING_ARTICLE, FETCH_ARTICLE } from "../actionTypes";
import axios from "axios";
const BASE_URL = "https://api-trials.x5.com.au/";
import Swal from "sweetalert2";

export const fetchArticles = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(BASE_URL + "api/articles");
      // console.log("API Response:", response.data);
      dispatch({ type: FETCH_ARTICLES, payload: response.data });
    } catch (error) {
      console.error("Error fetching articles:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchArticle = (id) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(BASE_URL + "api/articles/" + id);
      // console.log("API Response:", response.data);
      dispatch({ type: FETCH_ARTICLE, payload: response.data });
    } catch (error) {
      console.error("Error fetching article:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export function setLoading(payload) {
  return {
    type: LOADING_ARTICLE,
    payload,
  };
}

export const addArticleAction = (payload) => {
  return (dispatch) => {
    return axios.post(`${BASE_URL}articles`, payload);
  };
};

export const editArticleAction = (payload, id) => {
  return dispatch => {
    return axios.put(`${BASE_URL}api/articles/${id}`, payload);
  };
};

export function deleteArticleById(id) {
  // console.log(id);
  return (dispatch) => {
    axios
      .delete(BASE_URL + "api/articles/" + id)
      .then(() => {
        dispatch(fetchArticles());
        Swal.fire({
          icon: "success",
          iconColor: "#57240f",
          title: "Delete Success!",
          color: "#080504",
          background: "#ebd7bb",
          confirmButtonColor: "#a35831",
        });
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          icon: "error",
          iconColor: "#57240f",
          title: "Error!",
          text: err.response.data.message,
          color: "#080504",
          background: "#ebd7bb",
          confirmButtonColor: "#a35831",
        });
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
}

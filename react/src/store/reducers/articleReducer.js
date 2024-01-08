import { FETCH_ARTICLES, LOADING_ARTICLE, FETCH_ARTICLE } from "../actionTypes";

const initialState = {
  articles: [],
  article: {},
};

function articlesReducer(state = initialState, action) {
  // let data = action.payload
  switch (action.type) {
    case FETCH_ARTICLES:
      // console.log(action.payload.data, ">>>>>>")
      return { ...state, articles: action.payload.data.articles };
      case FETCH_ARTICLE:
        console.log(action.payload.data, "<<<<<<<<<<<")
      return { ...state, article: action.payload.data };
    case LOADING_ARTICLE:
      return { ...state, isLoading: action.payload.data };
    default:
      return state;
  }
}

export default articlesReducer;

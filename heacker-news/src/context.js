import React, { useContext, useEffect, useReducer } from 'react'

import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions'
import reducer from './reducer'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {
  isLoading: false,
  query: 'knight',
  stories: [],
  page: { count: 0, totalPage: 0 },
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING, payload: true });
    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(url);
      console.log(data.nbPages);
      dispatch({ type: SET_STORIES, payload: { data } });
    } catch (error) {
      console.log(error);
    }
  }

  const handlePage = (action) => {
    dispatch({ type: HANDLE_PAGE, payload: action });
  }

  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORY, payload: id });
  }

  const handleSearch = (value) => {
    dispatch({ type: HANDLE_SEARCH, payload: value });
  }

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page.count}`);
  }, [state.page.count, state.query]);

  return <AppContext.Provider
    value={{
      ...state,
      handlePage,
      removeStory,
      handleSearch,
    }}
  >{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

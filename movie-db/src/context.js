import React, { useState, useContext } from 'react';
import useFetch from './useFetch';
// make sure to use https
export const API_ENDPOINT = `https://www.omdbapi.com/?`
export const API_KEY = `apikey=${process.env.REACT_APP_MOVIE_API_KEY}`;
const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [query, setQuery] = useState('batman');
  const { data, loading, error } = useFetch(`${API_ENDPOINT}s=${query}&${API_KEY}`);

  return <AppContext.Provider
    value={{
      data,
      loading,
      error,
      query,
      setQuery,
    }}
  >{children}</AppContext.Provider>
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }

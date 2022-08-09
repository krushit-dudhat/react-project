import { useState, useEffect, useCallback } from 'react'
import paginate from './utils'
const url = 'https://api.github.com/users/john-smilga/followers?per_page=12'

export const useFetch = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1);

  const changePage = (newValue) => {
    if (newValue < 1) {
      setPage(1);
    } else {
      setPage(newValue);
    }
  }
  const getProducts = useCallback(async () => {
    const response = await fetch(`${url}&page=${page}`);
    const data = await response.json();
    if (data.length === 0) {
      setPage(page - 1);
    } else {
      setData(data);
    }
    setLoading(false);
  }, [page]);

  useEffect(() => {
    getProducts()
  }, [page, getProducts])
  return { loading, data, changePage, page }
}

import { useState, useEffect } from 'react'

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({ show: false, msg: '' });
  const [totalResult, setTotalResult] = useState(0);

  const fetchMovies = async (url) => {
    setLoading(true);
    try {
      const res = await fetch(url);
      const data = await res.json();

      if (data.Response === 'True') {
        setData(data.Search || data);
        setTotalResult(data.totalResults);

        setError({ show: false, msg: '' });
      } else {
        setError({ show: true, msg: 'No results found' });
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchMovies(url);
  }, [url]);
  return { data, loading, error, totalResult };
}

export default useFetch;
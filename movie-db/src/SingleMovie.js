import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { API_ENDPOINT, API_KEY } from './context';
import useFetch from './useFetch';

const SingleMovie = () => {
  const { id } = useParams();
  const { loading, data: movie, error } = useFetch(`${API_ENDPOINT}i=${id}&${API_KEY}`);

  if (loading) {
    return <div className="loading"></div>
  }
  if (error.show) {
    return (
      <div className="page-error">
        <h1>{error.msg}</h1>
        <Link to="/" className='btn'>
          back to Movies
        </Link>
      </div>
    )
  }

  const { Poster: poster, Title: title, Plot: plot, Year: year } = movie;
  return (
    <section className="single-movie">
      <img src={poster} alt={title} />
      <div className="single-movie-info">
        <h2>{title}</h2>
        <p>{plot}</p>
        <h4>{year}</h4>
        <Link to='/' className='btn'>
          back to movies
        </Link>
      </div>
    </section>
  )
}

export default SingleMovie

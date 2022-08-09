import React, { useState, useEffect, useCallback, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}&per_page=10`
// const clientID = '?client_id=UxmpxoQ6vpWNRLxObI9IAw2CEYtM5Ly3yLw1F8O4Bz4'

const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`

function App() {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const searchTerm = useRef('');

  const fetchImages = useCallback(async () => {
    setLoading(true);

    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    let url;

    if (query) {
      url = `${searchUrl}${clientID}${urlQuery}${urlPage}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          return [...oldPhotos, ...data.results];
        } else {
          return [...oldPhotos, ...data];
        }

      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, [page, query]);

  useEffect(() => {
    fetchImages();
  }, [page, fetchImages]);

  useEffect(() => {
    const event = window.addEventListener('scroll', () => {
      if (
        !loading &&
        (window.innerHeight + window.scrollY) >= document.body.scrollHeight - 19
      ) {
        setPage((oldPage) => {
          console.log('old page:: ', oldPage);
          return oldPage + 1
        });
        // fetchImages();
      }
    });
    return () => window.removeEventListener('scroll', event);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(searchTerm.current.value);
    setPage(1);
  };

  return (
    <main>
      <section className="search">
        <form className='search-form'>
          <input type="text"
            placeholder='search'

            ref={searchTerm}
            className="form-input" />
          <button type='submit'
            onClick={handleSubmit}
            className="submit-btn">
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => {
            return <Photo key={index} {...photo} />
          })}
        </div>
        {loading && <h2 className='loading'>Loading...</h2>}
      </section>
    </main>
  )
}

export default App

import React, { useState, useEffect } from 'react'
import { useFetch } from './useFetch'
import Follower from './Follower'
function App() {
  const { loading, data, page, changePage } = useFetch();
  let displayPageIndex;
  if (page <= 1) {
    displayPageIndex = [page, page + 1, page + 2];
  } else {
    displayPageIndex = [page - 1, page, page + 1];
  }

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? 'loading...' : 'paginated users'}</h1>
        <div className="underline"></div>
      </div>
      <section className="followers">
        <div className="container">
          {data.map((follower) => {
            return (
              <Follower key={follower.id} {...follower} />
            )
          })}
        </div>
        {!loading &&
          <div className="btn-container">
            <button className='prev-btn' onClick={() => changePage(page - 1)}>
              prev
            </button>
            {displayPageIndex.map((pageIndex) => {
              return (
                <button key={pageIndex}
                  className={page === pageIndex ? 'active-btn page-btn' : 'page-btn'}
                  onClick={() => changePage(pageIndex)}
                >
                  {pageIndex}
                </button>
              )
            })}
            <button className='next-btn' onClick={() => changePage(page + 1)}>
              next
            </button>
          </div>}
      </section>
    </main>
  );
}

export default App

import React from 'react'
import { useGlobalContext } from './context'

const Buttons = () => {
  const { isLoading, page, handlePage } = useGlobalContext();
  return (
    <div className='btn-container'>
      <button disabled={isLoading || page.count === 0} onClick={() => handlePage('prev')}>
        prev
      </button>
      {page.count + 1} of {page.totalPage + 1}
      <button disabled={isLoading || page.count === page.totalPage} onClick={() => handlePage('next')}>
        next
      </button>
    </div>
  )
}

export default Buttons

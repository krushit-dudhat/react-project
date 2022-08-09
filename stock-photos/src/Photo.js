import React from 'react'

const Photo = ({
  urls: { regular },
  alt_description,
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  }
}) => {
  return (
    <article className='photo'>
      <img src={ } alt="" />
    </article>
  )
}

export default Photo

import React, { useState, useEffect } from 'react'
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'
const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg'
function App() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [field, setField] = useState('name');
  const [value, setValue] = useState('');

  const generateUser = async () => {
    setLoading(true);

    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results[0]);
    const {
      name: { first: firstName, last: lastName },
      picture: { large: image },
      dob: { age },
      location: { street: { number, name } },
      phone,
      email,
      login: { password },
    } = data.results[0];

    setUser({
      name: `${firstName} ${lastName}`,
      image,
      age: age,
      street: `${number} ${name}`,
      phone,
      email,
      password,
    });
    setLoading(false);
    setField('name');
    setValue(`${firstName} ${lastName}`);
  };

  useEffect(() => {
    generateUser();
  }, []);

  const handleMouseOver = (e) => {
    e.preventDefault();
    const title = e.target.dataset.label;
    setField(title);
    setValue(user[title]);
  }

  return (
    <main>
      <div className="block bcg-black">
      </div>
      <div className="block">
        <div className="container">
          <img
            src={user?.image || defaultImage}
            alt={user?.name || 'Random Person'}
            className='user-img'
          />
          <p className='user-title'>my {field} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className='icon'
              data-label='name'
              onMouseOver={handleMouseOver}
            >
              <FaUser />
            </button>
            <button
              className='icon'
              data-label='email'
              onMouseOver={handleMouseOver}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className='icon'
              data-label='phone'
              onMouseOver={handleMouseOver}
            >
              <FaPhone />
            </button>
            <button
              className='icon'
              data-label='street'
              onMouseOver={handleMouseOver}
            >
              <FaMap />
            </button>
            <button
              className='icon'
              data-label='age'
              onMouseOver={handleMouseOver}
            >
              <FaCalendarTimes />
            </button>
            <button
              className='icon'
              data-label='password'
              onMouseOver={handleMouseOver}
            >
              <FaLock />
            </button>
          </div>
          <button
            className='btn'
            type='button'
            onClick={() => { generateUser() }}
          >
            {loading ? 'Loading...' : 'Random User'}
          </button>
        </div>
      </div>
    </main>
  )
}

export default App

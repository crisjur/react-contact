import React from 'react';
import {Link, useLocation} from 'react-router-dom';

function Home() {
  const location = useLocation();
  return (
    <div className="d-flex justify-content-center w-100 p-5">
      <Link
          to={{
            pathname: '/contacts/all',
            state: { background: location }
          }}
      >
        <button className="btn btn-primary btn-sm mx-4 rounded-0 px-5">Modal A</button>
      </Link>
      <Link
          to={{
            pathname: '/contacts/us',
            state: { background: location }
          }}
      >
        <button className="btn btn-primary btn-sm mx-4 rounded-0 px-5">Modal B</button>
      </Link>
    </div>
  );
}

export default Home;

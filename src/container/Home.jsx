import React from 'react';
import {useLocation, useHistory} from 'react-router-dom';

function Home() {
  const location = useLocation();
  const history = useHistory();

  const navigate = (option) => {
    history.push(`/contacts/${option}`, { background: location })
  }
  return (
    <div className="d-flex justify-content-center w-100 p-5">
      <button className="btn btn-primary btn-sm mx-4 rounded-0 px-5" onClick={() => navigate('all')}>Modal A</button>
      <button className="btn btn-primary btn-sm mx-4 rounded-0 px-5" onClick={() => navigate('us')}>Modal B</button>
    </div>
  );
}

export default Home;

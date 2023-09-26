import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="flex justify-center">
      <div className='grid grid-cols-1 md:grid-cols-2 w-full max-w-screen-xl'>
      <Link to='/' className="nav-link">Home</Link>
      <Link to='/new' className="nav-link">Enter New Tribe</Link>
       
        {/* <Link to='/tribes' className="nav-link">Tribes</Link>
        <Link to='/contestants' className="nav-link">Contestants</Link> */}
      </div>
    </nav>
  );
}

export default Nav;

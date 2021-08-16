import React from 'react';
import { Link } from 'react-router-dom';

export default function CreatePersonButton() {
  return (
    <React.Fragment>
      <Link to='/addPerson' className='btn btn-lg btn-info'>
        Create a Person
      </Link>
    </React.Fragment>
  );
}

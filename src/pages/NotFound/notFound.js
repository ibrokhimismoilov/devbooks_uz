import React from 'react';
import { Link } from 'react-router-dom';
import { NotFoundPage } from './notFoundStyled';

export default function NotFound() {

  return (
    <NotFoundPage>
      <h1 align="center">Not found page. <br />Go to <Link to="/">home page</Link></h1>
    </NotFoundPage>
  )
}

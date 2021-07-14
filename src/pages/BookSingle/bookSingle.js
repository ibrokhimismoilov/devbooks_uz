import React from 'react';

export default function BookSingle({books}) {
  console.log("bookSingle", books);

  return (
    <div className="book-single">
      <div className="auto-container">
        <h1 align="center">Book single page</h1>
      </div>
    </div>
  )
}

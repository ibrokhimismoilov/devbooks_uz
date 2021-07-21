import React from 'react'

export default function UserPage({user}) {
  return (
    <div className="auto-container">
      <h1>Hi {user.firstName}</h1>
    </div>
  )
}

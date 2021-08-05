import React from 'react'
import { useSelector } from 'react-redux';

export default function UserPage() {
  const {user} = useSelector(state => state.user);  

  return (
    <div className="auto-container">
      <h1>Hi {user.firstName}</h1>
    </div>
  )
}

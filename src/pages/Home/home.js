import React from "react";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <br />
      <h1 align="center">
        Hi {user.firstName}
      </h1>
    </div> 
  );
}

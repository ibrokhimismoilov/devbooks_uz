import React from "react";
import Authors from "../Authors";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <br />
      <h1 align="center">
        Hi {user.firstName}
      </h1>
      <br />
      <br />
      <Authors />
    </div> 
  );
}

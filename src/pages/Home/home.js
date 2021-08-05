import React from "react";
import { useSelector } from "react-redux";
import Authors from "../Authors";

export default function Home() {
  const {user} = useSelector(state => state.user);  

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

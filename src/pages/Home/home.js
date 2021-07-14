import React from "react";
import { Redirect } from "react-router-dom";

export default function Home({ logged }) {

  const user = JSON.parse(localStorage.getItem("token"));

  if (!logged) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div>
      <h1 align="center">
        <br /> Hi {user.firstname}
      </h1>
      <br />
      <table
        style={{ marginInline: "auto", border: "1px solid" }}
        cellSpacing={20}
      >
        <tbody>
          <tr>
            <th align="left">username:</th>
            <td>
              <i>{user.firstname}</i>
            </td>
          </tr>
          <tr>
            <th align="left">lastname:</th>
            <td>
              <i>{user.lastname}</i>
            </td>
          </tr>
          <tr>
            <th align="left">phone:</th>
            <td>
              <i>{user.phone}</i>
            </td>
          </tr>
          <tr>
            <th align="left">email:</th>
            <td>
              <i>{user.email}</i>
            </td>
          </tr>
          <tr>
            <th align="left">password:</th>
            <td>
              <i>{user.password}</i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

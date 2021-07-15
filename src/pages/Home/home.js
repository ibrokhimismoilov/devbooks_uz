import React from "react";
import { Redirect } from "react-router-dom";

export default function Home({ logged }) {
  const user = JSON.parse(localStorage.getItem("docs"));

  if (!logged) {
    return <Redirect to="/sign-in" />;
  }

  return (
    <div>
      <h1 align="center">
        <br /> Hi {user.firstName}
      </h1>
      <br />
      <table
        style={{ marginInline: "auto", border: "1px solid" }}
        cellSpacing={20}
      >
        <tbody>
          <tr>
            <th align="left">id:</th>
            <td>
              <i>{user._id}</i>
            </td>
          </tr>
          <tr>
            <th align="left">username:</th>
            <td>
              <i>{user.firstName}</i>
            </td>
          </tr>
          <tr>
            <th align="left">lastname:</th>
            <td>
              <i>{user.lastName}</i>
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
            <th align="left">updatedAt:</th>
            <td>
              <i>{user.updatedAt}</i>
            </td>
          </tr>
          <tr>
            <th align="left">createdAt:</th>
            <td>
              <i>{user.createdAt}</i>
            </td>
          </tr>
          <tr>
            <th align="left">lang:</th>
            <td>
              <i>{user.lang}</i>
            </td>
          </tr>
          <tr>
            <th align="left">__v:</th>
            <td>
              <i>{user.__v}</i>
            </td>
          </tr>
          <tr>
            <th align="left">isAdmin:</th>
            <td>
              <i>{user.isAdmin}</i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

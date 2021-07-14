import React from 'react';
import bannerJpg from "../../assets/images/banner.svg";
import {HeaderStyled} from "./headerStyled";
import { BiSearchAlt } from "react-icons/bi";

export default function Header() {
  return (
    <HeaderStyled className="auto-container header">

      <div className="header__banner">
        <img src={bannerJpg} alt="banner" />
      </div>

      <form className="header__search">
        <h1 className="header__search-title">Qidirish</h1>
        <input type="text" className="header__search-input" placeholder="Adiblar, kitoblar, audiolar, maqolalar..."/>
        <button className="header__search-btn">
          <BiSearchAlt />
          Izlash
        </button>
      </form>
    </HeaderStyled>
  )
}

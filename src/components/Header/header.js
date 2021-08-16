import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import banner1 from "../../assets/images/banner/banner.svg";
import banner2 from "../../assets/images/banner/banner2.jpg";
import banner3 from "../../assets/images/banner/banner3.jpg";
import banner4 from "../../assets/images/banner/banner4.jpg";
import { HeaderStyled } from "./headerStyled";
import { BiSearchAlt } from "react-icons/bi";

const slides = [
  { img: banner1, title: "Temuriylar davri adabiyoti" },
  { img: banner2, title: "Chet el adabiyotlari" },
  { img: banner3, title: "Asaxiy books" },
  { img: banner4, title: "O'zbekiston tarixi va adabiyoti" },
];

export default function Header({ visibleSearch, searchDataHander }) {
  const settings = {
    dots: true,
    accessibility: false,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const searchHandler = (e) => {
    e.preventDefault();
    e.target[0].value.length
      ? searchDataHander(e.target[0].value)
      : searchDataHander("");
  };

  return (
    <HeaderStyled className="auto-container header">
      <Slider className="header__banner" {...settings}>
        {slides.map((item) => (
          <div key={item} className="header__banner-item">
            <h1 className="content">{item.title}</h1>
            <img src={item.img} alt="banner" />
          </div>
        ))}
      </Slider>

      {visibleSearch && (
        <form className="header__search" onSubmit={searchHandler}>
          <h1 className="header__search-title">Qidirish</h1>
          <input
            type="text"
            className="header__search-input"
            placeholder="Adiblar, kitoblar, audiolar, maqolalar..."
          />
          <button className="header__search-btn">
            <BiSearchAlt />
            Izlash
          </button>
        </form>
      )}
    </HeaderStyled>
  );
}

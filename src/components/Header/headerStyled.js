import styled from "styled-components";

export const HeaderStyled = styled.header`
  padding-top: 54px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  .header {
    &__banner {
      position: relative;
      border-radius: 25px 25px 0 0;
      margin: 0 auto;
      max-width: 1262px;
      width: 100%;

      user-select: none;

      .slick-active .content {
        animation: fadeToRight 0.4s 0.8s ease 1 forwards;
      }

      .slick-arrow {
        display: none !important;
      }

      .slick-dots {
        position: absolute;
        z-index: 2;
        bottom: 80px;
        left: 80px;
        display: flex !important;
        flex-direction: row;

        li {
          display: block !important;

          button {
            cursor: pointer;
            outline: none !important;
            border: none;
            font-size: 0;
            width: 57px;
            height: 5px;
            border-radius: 5px;
            background-color: rgba(255, 255, 255, 0.6) !important;
          }

          &:not(:last-child) {
            margin-right: 5px;
          }

          &.slick-active button {
            background-color: rgba(255, 255, 255, 1) !important;
          }
        }

        @media (max-width: 767px) {
          left: 0;
          justify-content: center;
          width: 100%;

          li button {
            width: 20px;
            height: 5px;
          }
        }
      }

      &-item {
        position: relative;
        padding: 45px 80px;
        width: 100%;
        height: 347px;
        border-radius: 25px;
        overflow: hidden;

        .content {
          display: block;
          position: relative;
          z-index: 1;
          max-width: 337px;
          width: 100%;
          font-size: 61px;
          font-weight: 100;
          font-family: "Rotterburg Stylish FREE";
          color: #c9ac8c;
          opacity: 0;
          transform: translateX(-30px);
        }

        img {
          position: absolute;
          right: 0;
          top: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right;
        }

        @media (max-width: 767px) {
          padding: 40px 20px;
          display: flex;
          .content {
            font-size: 32px;
            text-align: center;
            left: 0;
            right: 0;
            margin: 0 auto;
            padding: 0 10px;
          }
        }
      }
    }

    &__search {
      position: relative;
      top: -50px;
      max-width: 1114px;
      width: 100%;
      border-radius: 15px;
      padding: 35px 100px;
      background-color: #191919;
      display: flex;
      flex-wrap: wrap;
      box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

      &-title {
        width: 100%;
        text-align: center;
        font-family: "Rotterburg Stylish FREE";
        font-size: 31px;
        color: #c9ac8c;
        margin-bottom: 15px;
      }

      &-input {
        padding: 10px 27px;
        height: 47px;
        border-radius: 15px;
        width: calc(100% - 174px);
        background-color: #404040;
        border: none;
        font-size: 16px;
        color: #fff;

        &::placeholder {
          color: rgba(255, 255, 255, 0.3);
        }

        &:focus,
        &:active,
        &:hover {
          outline: none;
        }
      }

      &-btn {
        margin-left: 14px;
        cursor: pointer;
        width: 160px;
        height: 47px;
        border-radius: 15px;
        background-color: #c9ac8c;
        border: 1px solid #c9ac8c;
        color: #3c2710;
        font-size: 16px;
        letter-spacing: 1px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s linear;

        svg {
          font-size: 24px;
          margin-right: 7px;
        }

        &:focus,
        &:active,
        &:hover {
          outline: none;
          color: #c9ac8c;
          background-color: transparent;
        }
      }

      @media (max-width: 767px) {
        padding: 30px 15px;
        &-input {
          width: 100%;
          text-align: center;
        }

        &-btn {
          margin: 15px auto;
        }
      }
    }
  }
`;

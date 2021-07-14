import styled from "styled-components";

export const HeaderStyled = styled.header`
  padding-top: 54px;
  position: relative;
  display: flex;
  align-items: center;
  flex-direction: column;

  .header {
    &__banner {
        overflow: hidden;
        border-radius: 25px 25px 0 0;
      width: 100%;
      height: 347px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: right;
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

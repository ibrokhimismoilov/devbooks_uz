import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateLanguage, updateTheme } from "../../store/actions/userActions";

export default function TabSettings() {
  const { lang } = useSelector((state) => state.user.user);
  const [language, setLanguage] = useState(lang);
  const [theme, setTheme] = useState("light");
  const dispatch = useDispatch();

  const languageHandler = (e) => {
    setLanguage(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Language saved to redux store");
    dispatch(updateLanguage(language));
    dispatch(updateTheme(theme));
  };

  console.log("theme =>", theme);
  console.log("language =>", language);

  return (
    <form className="user-settings__tab-item" onSubmit={onSubmit}>
      <div className="right security-tab">
        <h1 className="user-settings__title">
          Change Or Recover Your Password:
        </h1>
        <div className="user-settings__input-group">
          <div className="user-settings__inputbox">
            <label>Language</label>
            <select
              className="input-control"
              onChange={languageHandler}
              name="language"
              value={language}
            >
              <option value="en">English</option>
              <option value="ru">Russian</option>
              <option value="uz">Uzbek</option>
            </select>
          </div>
          <div className="user-settings__inputbox">
            <label>Theme</label>
            <input
              hidden
              id="switch-theme"
              className="switch-control"
              type="checkbox"
              checked={theme === "dark" ? true : false}
              onChange={(e) =>
                e.target.checked ? setTheme("dark") : setTheme("light")
              }
            />
            <label htmlFor="switch-theme" className="switch-theme">
              <span className="switch-theme__inner"></span>
            </label>
          </div>
        </div>
        <button className="btn btn-darkblue">Save changes</button>
      </div>
    </form>
  );
}
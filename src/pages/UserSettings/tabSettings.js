import React, { useState } from "react";

export default function TabSettings() {
  const [settings, setSettings] = useState({
    language: "Uzbek",
    theme: true,
  });

  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === "theme") {
      const { checked } = e.target;
      setSettings((state) => ({ ...state, [name]: checked }));
    } else {
      setSettings((state) => ({ ...state, [name]: value }));
    }
  };

  const onSubmit = e => {
    e.preventDefault();
  }

  console.log(settings);

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
              onChange={inputHandler}
              name="language"
              value={settings.language}
            >
              <option value="English">English</option>
              <option value="Russian">Russian</option>
              <option value="Uzbek">Uzbek</option>
            </select>
          </div>
          <div className="user-settings__inputbox">
            <label>Theme</label>
            <input
              id="switch-theme"
              className="switch-control"
              type="checkbox"
              name="theme"
              onChange={inputHandler}
              hidden
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

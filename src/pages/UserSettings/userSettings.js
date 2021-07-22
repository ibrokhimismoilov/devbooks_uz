import React, { useState, Suspense, lazy } from "react";
const TabProfile = lazy(() => import("./tabProfile"));

const navs = [
  { idx: 0, number: 1, text: "My account", desc: null },
  { idx: 1, number: 2, text: "Security", desc: null },
  { idx: 2, number: 3, text: "Settings", desc: null },
];

const x = null;
export default function UserSettings() {
  const [activeIdx, setActiveIdx] = useState(0);

  const userSettingsNavs = navs.map((item, index) => {
    return (
      <li
        key={item.idx}
        onClick={() => setActiveIdx(item.idx)}
        className={`user-settings__nav-item ${
          activeIdx === index ? "active" : ""
        }`}
      >
        <span className="number">{item.number}</span>
        <p className="text">
          <b>{item.text}</b>
          <span>{item.desc}</span>
        </p>
      </li>
    );
  });

  return (
    <section className="user-settings auto-container">
      <ul className="user-settings__nav">{userSettingsNavs}</ul>
      <div className="user-settings__tab">
        <Suspense fallback={<h1 className="bg-danger">Loading...</h1>}>
          {activeIdx === 2 ? (
            <h1>Tab3</h1>
          ) : activeIdx === 1 ? (
            <h1>Tab2</h1>
          ) : (
            <TabProfile />
          )}
        </Suspense>
      </div>
    </section>
  );
}

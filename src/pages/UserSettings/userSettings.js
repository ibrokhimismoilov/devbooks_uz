import React, { useState, Suspense, lazy } from "react";
const TabProfile = lazy(() => import("./tabProfile"));
const TabSecurity = lazy(() => import("./tabSecurity"));
const TabSettings = lazy(() => import("./tabSettings"));

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
        <Suspense
          fallback={<h1 className="text-primary text-center">Loading...</h1>}
        >
          {activeIdx === 0 ? (
            <TabProfile />
          ) : activeIdx === 1 ? (
            <TabSecurity />
          ) : (
            <TabSettings />
          )}
        </Suspense>
      </div>
    </section>
  );
}

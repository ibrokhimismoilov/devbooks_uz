import React from "react";
import ReactDOM from "react-dom";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store, { persistor } from "./store";
import App from "./App";

console.log("Store: ", store);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={<h1>Loading persist gade...</h1>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

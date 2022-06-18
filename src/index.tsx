import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./components/Header";
import Main from "./components/Main";
import reportWebVitals from "./reportWebVitals";
import PresetPanel from "./components/PresetPanel";
import { IPreset } from "./services/LocalStorageService";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Header />
    <Main />
  </React.StrictMode>
);

reportWebVitals();

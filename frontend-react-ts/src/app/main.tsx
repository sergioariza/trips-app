import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";
import "../assets/styles/main.scss";
import ReduxProvider from "./providers/ReduxProvider";
import RouterProvider from "./providers/RouterProvider";
import LocalizationProvider from "./providers/LocalizationProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider>
      <LocalizationProvider>
        <RouterProvider>
          <App />
        </RouterProvider>
      </LocalizationProvider>
    </ReduxProvider>
  </React.StrictMode>
);

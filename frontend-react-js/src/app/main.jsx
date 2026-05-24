import React from "react";
import ReactDOM from "react-dom/client";
import ReduxProvider from "./providers/ReduxProvider";
import LocalizationProvider from "./providers/LocalizationProvider";
import RouterProvider from "./providers/RouterProvider";
import App from "./App";
import "./i18n";
import "../assets/styles/main.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
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

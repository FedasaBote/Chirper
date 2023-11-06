// import "stop-runaway-react-effects/hijack";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AppProviders from "./context/AppProviders.jsx";
import registerServiceWorker from "./registerServiceWorker";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </React.StrictMode>
);
registerServiceWorker();

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./components/App/App.jsx";
import { store, persistor } from "./redux/store.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "#fc7100",
                color: "#fff",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "600",
              },
              success: {
                iconTheme: {
                  primary: "#27ae60",
                  secondary: "#fff",
                },
              },
              error: {
                iconTheme: {
                  primary: "#e74c3c",
                  secondary: "#fff",
                },
              },
            }}
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

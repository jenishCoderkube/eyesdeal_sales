import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/tailwind.css"; // Added Tailwind CSS import
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </BrowserRouter>
);

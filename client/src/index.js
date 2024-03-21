import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
const App = lazy(() => import("./App"));
const Table = lazy(() => import("./Table"));
const NotFound = lazy(() => import("./NotFound"));
// import Loading from "./Loading";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Suspense fallback={<h2>🔃 Loading... 🔃</h2>}>
              <App />
            </Suspense>
          }
        />
        <Route
          path="/table"
          element={
            <Suspense fallback={<h2>🔃 Loading... 🔃</h2>}>
              <Table />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<h2>🔃 Loading... 🔃</h2>}>
              <NotFound />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

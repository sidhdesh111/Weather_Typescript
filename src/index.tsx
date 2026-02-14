import React, { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";

const App = lazy(() => import("./App"));
import "./index.css";
import LoadingSkeleton from "./components/LoadingSkeleton";

const container = document.getElementById("root");

if (!container) {
  throw new Error("Root container missing in index.html");
}

const root = createRoot(container);

root.render(
  <Suspense fallback={<LoadingSkeleton />}>
    <App />
  </Suspense>,
);

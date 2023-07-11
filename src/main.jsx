import React from "react";
import ReactDOM from "react-dom/client";
import AutoTable from "./components/AutoTable";

import { autoTableComponentInit } from "./components/AutoTable.jsx";
import "./index.css";

autoTableComponentInit();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AutoTable />
  </React.StrictMode>,
);

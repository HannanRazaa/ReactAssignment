// index.js
import React from "react";
import ReactDOM from "react-dom/client";

import { ApolloProviderWrapper } from "./contexts/ApolloContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProviderWrapper>
      <App />
    </ApolloProviderWrapper>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import RegisterForm from "./RegisterForm"; // або VotingPanel, якщо хочеш DAO

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RegisterForm />
  </React.StrictMode>
);

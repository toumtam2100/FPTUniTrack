import React, { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginPage/LoginForm/LoginForm";
import LoggedIn from "./components/LoginPage/LoggedIn/LoggedIn";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        <LoggedIn setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <LoginForm setIsLoggedIn={setIsLoggedIn} handleLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
import React, { useState } from "react";
import AuthForm from "./AuthForm";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (newToken) => {
    setToken(newToken);
  };

  if (!token) return <AuthForm onLogin={handleLogin} />;

  return (
    <div>
      <h1>Witaj w systemie aukcji</h1>
      <p>Jesteś zalogowany.</p>
      <button onClick={() => { localStorage.removeItem("token"); setToken(null); }}>
        Wyloguj
      </button>
      {/* tutaj później dodamy formularz dodawania aukcji */}
    </div>
  );
}

export default App;

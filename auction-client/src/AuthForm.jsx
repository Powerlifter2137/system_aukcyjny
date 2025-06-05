import React, { useState } from "react";
import axios from "axios";

const AuthForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? "register" : "login";

    try {
      const response = await axios.post(`http://localhost:5000/api/auth/${endpoint}`, {
        username,
        password,
        email: isRegistering ? `${username}@mail.com` : undefined,
      });

      if (!isRegistering) {
        const token = response.data.token;
        localStorage.setItem("token", token);
        onLogin(token);
      } else {
        alert("Rejestracja zakończona. Zaloguj się.");
        setIsRegistering(false);
      }
    } catch (err) {
      alert("Błąd logowania/rejestracji");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isRegistering ? "Rejestracja" : "Logowanie"}</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Nazwa użytkownika" />
      <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Hasło" />
      <button type="submit">{isRegistering ? "Zarejestruj" : "Zaloguj"}</button>
      <p onClick={() => setIsRegistering(!isRegistering)} style={{ cursor: "pointer", color: "blue" }}>
        {isRegistering ? "Masz konto? Zaloguj się" : "Nie masz konta? Zarejestruj się"}
      </p>
    </form>
  );
};

export default AuthForm;

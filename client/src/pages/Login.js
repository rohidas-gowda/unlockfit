import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function loginUser(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    const data = await response.json();

    if (data.user) {
      navigate("/customer-dashboard", {
        state: { email: data.email, name: data.name },
      });
    } else {
      alert("Please check your username");
    }
  }

  return (
    <div id="loginLayout">
      <div>
        <h2
          style={{
            marginLeft: "5rem",
            marginTop: "2rem",
            fontWeight: "normal",
            fontSize: "20px",
          }}
        >
          unlock.fit
        </h2>
      </div>

      <div className="cardAlign">
        <div className="loginCard">
          <form onSubmit={loginUser} className="loginForm">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "24%",
              }}
            >
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
                style={{
                  height: "20px",
                  width: "220px",
                  border: "1px solid #D2A72B",
                  borderRadius: "4px",
                  padding: "4px",
                  outlineStyle: "none",
                }}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "28px",
              }}
            >
              <input
                type="submit"
                style={{
                  height: "32px",
                  width: "150px",
                  border: "1px solid #D2A72B",
                  backgroundColor: "#a37f17",
                  borderRadius: "8px",
                  fontWeight: "bold",
                  color: "#ffffff"
                }}
                value="Login"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

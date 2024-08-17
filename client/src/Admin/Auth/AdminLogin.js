import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      fetch("http://127.0.0.1:3001/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then((res) => {
        console.log("frontend message");
        if (res.ok) {
          console.log("successful");
          navigate("/admin-dashboard");
        } else {
          console.log("not successful");
        }
      });
    } catch (err) {
      console.log("An error is occured", err);
    }
  };
  return (
    <div className="admin-login">
      <div className="login-form">
        <div style={{ padding: "30px" }}>
          <h3> LOGIN AS ADMIN </h3>
          <div style={{ height: "20px" }}></div>
          <div>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "300px" }}
              />

              <div style={{ height: "10px" }}></div>

              <label htmlFor="password">Password</label>
              <input
                type="text"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div style={{ height: "30px" }}></div>

              <button type="submit">Login</button>
              <div style={{ height: "10px" }}></div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

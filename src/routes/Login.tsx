import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import { API_URL } from "../auth/authConstants";
import '../assets/css/auth.css';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [activeTab, setActiveTab] = useState('specialist');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const auth = useAuth();

  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "email") {
      setEmail(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // auth.setIsAuthenticated(true);
    console.log(API_URL);
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center vh-100">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'specialist' ? 'active bg-dark text-light' : ''}`}
                    onClick={() => handleTabChange('specialist')}
                  >
                    Especialista
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'employee' ? 'active bg-dark text-light' : ''}`}
                    onClick={() => handleTabChange('employee')}
                  >
                    Empleado
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <h2 className="card-title text-center text-primary mb-4">Log in</h2>
              {!!errorResponse && <div className="alert alert-danger">{errorResponse}</div>}
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    name="email"
                    placeholder="Email"
                    type="text"
                    className="form-control"
                    onChange={handleChange}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="form-control"
                    onChange={handleChange}
                    value={password}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-block">LOG IN</button>
                </div>
              </form>
            </div>
            <div className="card-footer text-center">
              <p>¿No tienes una cuenta? <a href="signup">Sign Up</a></p>
            </div>
          </div>
        </div>
    </div>
  );
}

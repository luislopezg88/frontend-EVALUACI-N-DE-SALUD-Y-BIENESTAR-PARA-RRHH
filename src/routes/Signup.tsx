import { useState } from "react";
import DefaultLayout from "../layout/DefaultLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";
import { API_URL } from "../auth/authConstants";
import Card from 'react-bootstrap/Card';

export default function Signup() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [puestoTrabajo, setPuestoTrabajo] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, password, edad, sexo, puestoTrabajo }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        setEmail("");
        setName("");
        setPassword("");
        setEdad("");
        setSexo("");
        setPuestoTrabajo("");
        goTo("/");
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
    <DefaultLayout>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <Card>
            <Card.Header>
              <h2 className="text-center text-primary">Sign in</h2>
            </Card.Header>
            <Card.Body>
              <form onSubmit={handleSubmit} >
                {!!errorResponse && <div className="alert alert-danger">{errorResponse}</div>}
                <div className="form-group">
                  <input
                    type="text"
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Nombre completo"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="Contraseña"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="edad"
                    className="form-control"
                    placeholder="Edad"
                    onChange={(e) => setEdad(e.target.value)}
                    value={edad}
                  />
                </div>
                <div className="form-group">
                  <select
                    name="sexo"
                    className="form-control"
                    placeholder="Seleccionar Sexo"
                    onChange={(e) => setSexo(e.target.value)}
                    value={sexo}
                  >
                    <option value="">Genero</option>
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="puestoTrabajo"
                    className="form-control"
                    placeholder="Puesto de Trabajo"
                    onChange={(e) => setPuestoTrabajo(e.target.value)}
                    value={puestoTrabajo}
                  />
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </form>
            </Card.Body>
            <Card.Footer className="text-center">
              <p>¿No tienes una cuenta? <Link to="/">Log in</Link></p>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
    </DefaultLayout>
  );
}
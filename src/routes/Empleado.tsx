import { useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useNavigate } from "react-router-dom";
import { AuthResponseError } from "../types/types";
import { API_URL } from "../auth/authConstants";

export default function Empleado() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [edad, setEdad] = useState("");
  const [sexo, setSexo] = useState("");
  const [puesto, setPuesto] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const goTo = useNavigate();

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(name, lastname, edad);

    try {
      const response = await fetch(`${API_URL}/registroEmpleado`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, lastname, edad, sexo, puesto }),
      });
      if (response.ok) {
        setName("");
        setLastname("");
        setEdad("");
        setSexo("");
        setPuesto("");
        goTo("/empleados");
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center text-primary">Registro de empleados</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} >
                {!!errorResponse && <div className="alert alert-danger">{errorResponse}</div>}
                <div className="form-group mt-3">
                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Nombre"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="lastname"
                      className="form-control"
                      placeholder="Apellido"
                      onChange={(e) => setLastname(e.target.value)}
                      value={lastname}
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
                      name="puesto"
                      className="form-control"
                      placeholder="Puesto de trabajo"
                      onChange={(e) => setPuesto(e.target.value)}
                      value={puesto}
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary btn-block">Registrar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useNavigate } from "react-router-dom";
import { AuthResponseError } from "../types/types";

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
      const response = await fetch("http://localhost:3100/api/registroEmpleado", {
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
    <PortalLayout>
      <form onSubmit={handleSubmit} className="form">
        <h1>Registro de empleados</h1>
        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        <label>Nombre</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>Apellido</label>
        <input
          type="text"
          name="lastname"
          onChange={(e) => setLastname(e.target.value)}
          value={lastname}
        />
        <label>Edad</label>
        <input
          type="text"
          name="edad"
          onChange={(e) => setEdad(e.target.value)}
          value={edad}
        />
        <label>Sexo</label>
        <input
          type="text"
          name="sexo"
          onChange={(e) => setSexo(e.target.value)}
          value={sexo}
        />
        <label>Puesto</label>
        <input
          type="text"
          name="puesto"
          onChange={(e) => setPuesto(e.target.value)}
          value={puesto}
        />

        <button>Crear empleado</button>
      </form>
    </PortalLayout>
  );
}

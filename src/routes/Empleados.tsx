import { useState, useEffect } from "react";
import PortalLayout from "../layout/PortalLayout";
import { Link } from "react-router-dom";
import { API_URL } from "../auth/authConstants";

export default function ListaEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEmpleados() {
      try {
        const response = await fetch(`${API_URL}/listadoEmpleado`);
        if (response.ok) {
          const data = await response.json();
          setEmpleados(data.body.empleado); // Accede a "data.body.empleado"
        } else {
          setError("Error al cargar la lista de empleados");
        }
      } catch (error) {
        setError("Error de red");
      }
    }

    fetchEmpleados();
  }, []);

  return (
    <PortalLayout>
        <div className="accordion">
      <h1>Lista de Empleados</h1>
      <Link to="/me" className="crear">Crear empleado</Link>
      {error ? (
        <div>{error}</div>
      ) : (
        <ul>
          {empleados.map((empleado: { name: string, lastname: string, edad: string }, index) => (
            <li key={index}>
                {empleado.name} {empleado.lastname}, Edad: {empleado.edad}
            </li>
            ))}
        </ul>
      )}
      </div>
    </PortalLayout>
  );
}
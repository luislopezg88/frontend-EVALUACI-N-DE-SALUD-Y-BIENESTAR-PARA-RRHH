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
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center text-primary">Listado de Empleados</h2>
            </div>
            <div className="card-body">
              <div className="text-right">
                <a href="/me" className="btn btn-primary btn-xs">Crear</a>
              </div>
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
          </div>
        </div>
      </div>
    </div>
    </PortalLayout>
  );
}
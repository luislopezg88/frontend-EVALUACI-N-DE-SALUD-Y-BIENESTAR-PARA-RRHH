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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h2 className="text-center text-primary">Listado de empleados</h2>
            </div>
            <div className="card-body">
            <div className="d-flex justify-content-end mb-3">
              <a href="/me" className="btn btn-primary btn-sm px-2">Crear</a>
            </div>
            {error ? (
              <div className="alert alert-danger">{error}</div>
            ) : (
              <table className="table table-striped mb-5">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Sexo</th>
                    <th>Puesto</th>
                  </tr>
                </thead>
                <tbody>
                  {empleados.map((empleado: { name: string, lastname: string, edad: string, sexo: string, puesto: string }, index) => (
                    <tr key={index}>
                      <td>{empleado.name}</td>
                      <td>{empleado.lastname}</td>
                      <td>{empleado.edad}</td>
                      <td>{empleado.sexo}</td>
                      <td>{empleado.puesto}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
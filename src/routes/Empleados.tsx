import { useState, useEffect } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../auth/authConstants";

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function ListaEmpleados() {
  const [empleados, setEmpleados] = useState([]);
  const [error, setError] = useState("");
  const history = useNavigate();
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

  const handleEncuesta = ({ _id }: any) => {
    history(`/cuestionarios/${_id}`);
  };

  return (
    <PortalLayout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <Card>
              <Card.Header>
                <h2 className="text-center text-primary">
                  Listado de empleados
                </h2>
              </Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-end mb-3">
                  <Link to={"/me"}>
                    <a href="/me" className="btn btn-primary btn-sm px-2">
                      Crear
                    </a>
                  </Link>
                </div>
                {error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-striped mb-5">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Edad</th>
                          <th>Sexo</th>
                          <th>Puesto</th>
                          <th>Encuesta</th>
                        </tr>
                      </thead>
                      <tbody>
                        {empleados.map(
                          (
                            empleado: {
                              _id: any;
                              name: string;
                              lastname: string;
                              edad: string;
                              sexo: string;
                              puesto: string;
                            },
                            index
                          ) => (
                            <tr key={index}>
                              <td>{empleado.name}</td>
                              <td>{empleado.lastname}</td>
                              <td>{empleado.edad}</td>
                              <td>{empleado.sexo}</td>
                              <td>{empleado.puesto}</td>
                              <td>
                                <button
                                  onClick={() => {
                                    handleEncuesta(empleado);
                                  }}
                                >
                                  Iniciar encuesta
                                </button>
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

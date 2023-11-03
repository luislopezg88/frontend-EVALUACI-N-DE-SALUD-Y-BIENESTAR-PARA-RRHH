import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PortalLayout from "../layout/PortalLayout";
import { API_URL } from "../auth/authConstants";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

interface Cuestionario {
  _id: string;
  titulo: string;
  instrucciones: string;
}

export default function ListaCuestionarios() {
  const { idempleado } = useParams();
  const [cuestionarios, setCuestionarios] = useState<Cuestionario[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function fetchCuestionarios() {
      try {
        const response = await fetch(`${API_URL}/cuestionarios`);
        if (response.ok) {
          const data = await response.json();
          setCuestionarios(data.body.cuestionario);
        } else {
          setError("Error al cargar la lista de cuestionarios");
        }
      } catch (error) {
        setError("Error de red");
      }
    }

    fetchCuestionarios();
  }, []);

  return (
    <PortalLayout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <Card>
              <Card.Header>
                <h2 className="text-center text-primary">
                  Lista de Cuestionarios
                </h2>
              </Card.Header>
              <Card.Body>
                {error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : (
                  <div className="row justify-content-center">
                    {cuestionarios.map((cuestionario) => (
                      <div
                        key={cuestionario._id}
                        className="col-md-5 mx-4 mb-4 mt-5"
                      >
                        <Card>
                          <Card.Header>
                            <h5 className="text-center text-secondary">
                              {cuestionario.titulo}
                            </h5>
                          </Card.Header>
                          <Card.Body>
                            <p>{cuestionario.instrucciones}</p>
                            {idempleado === "0000" ? null : (
                              <Link
                                to={`/responder/${cuestionario._id}/${idempleado}`}
                                className="d-flex justify-content-end mb-3"
                              >
                                <button className="btn btn-primary btn-sm px-2">
                                  Aplicar Cuestionario
                                </button>
                              </Link>
                            )}
                            {idempleado !== "0000" ? null : (
                              <Link
                                to={`/cuestionarios-resultados/${cuestionario._id}`}
                                className="d-flex justify-content-end mb-3"
                              >
                                <button className="btn btn-primary btn-sm px-2">
                                  ver encuestas
                                </button>
                              </Link>
                            )}
                          </Card.Body>
                        </Card>
                      </div>
                    ))}
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

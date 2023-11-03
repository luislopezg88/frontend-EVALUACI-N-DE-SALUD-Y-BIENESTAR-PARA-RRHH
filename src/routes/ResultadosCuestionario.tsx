import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PortalLayout from "../layout/PortalLayout";
import { API_URL } from "../auth/authConstants";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Accordion } from "react-bootstrap";

// Define una interfaz para el tipo de cuestionario
interface Cuestionario {
  _id: string;
  titulo: string;
  instrucciones: string;
}

interface Resultado {
  _id: string;
  cuestionario_id: string;
  empleado_id: string;
  // Otros campos de resultado
}

export default function ListaCuestionarios() {
    const { cuestionarioId } = useParams();
  const [cuestionarios, setCuestionarios] = useState<Cuestionario[]>([]);
  const [error, setError] = useState<string>("");
  const [selectedCuestionario, setSelectedCuestionario] = useState<string>("");
  const [resultados, setResultados] = useState<Resultado[]>([]);

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

  useEffect(() => {
    async function fetchResultados() {
        try {
          const response = await fetch(`${API_URL}/resultados?cuestionarioId=${cuestionarioId}`);
          if (response.ok) {
            const data = await response.json();
            setResultados(data.body.resultados);
          }
        } catch (error) {
          setError("Error al cargar los resultados");
        }
      }

      fetchResultados();
  }, [cuestionarioId]);

  return (
    <PortalLayout>
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-12">
              <Card>
                <Card.Header>
                  <h2 className="text-center text-primary">Resultados del Cuestionario</h2>
                </Card.Header>
                <Card.Body>
                  {/* Mostrar los resultados aquí en acordeones ordenados por empleados */}
                  {resultados.map((resultado) => (
                    // Renderizar acordeón para cada empleado y mostrar los resultados
                    <div key={resultado._id} className="mb-3">
                      <Accordion>
                        <Accordion.Item eventKey="0">
                          <Accordion.Header>Empleado: {resultado.empleado_id}</Accordion.Header>
                          <Accordion.Body>
                            {/* Mostrar los detalles de los resultados aquí */}
                            {/* Puedes usar un mapeo similar para mostrar las respuestas */}
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
    </PortalLayout>
  );
}
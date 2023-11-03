import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PortalLayout from "../layout/PortalLayout";
import { API_URL } from "../auth/authConstants";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";

interface Cuestionario {
    _id: string;
    titulo: string;
    instrucciones: string;
    escala: string[];
    secciones: any[];
}

interface Respuestas {
[seccionId: string]: { [preguntaId: string]: string };
}

export default function ResponderCuestionario() {
const { cuestionarioId } = useParams();
const [cuestionario, setCuestionario] = useState<Cuestionario | null>(null);
const [respuestas, setRespuestas] = useState<Respuestas>({});
const [error, setError] = useState("");

useEffect(() => {
    async function fetchCuestionario() {
    try {
        const response = await fetch(`${API_URL}/cuestionarios/${cuestionarioId}`);
        if (response.ok) {
        const data = await response.json();
        setCuestionario(data.body.cuestionario);
        } else {
        setError("Error al cargar el cuestionario");
        }
    } catch (error) {
        setError("Error de red");
    }
    }

    fetchCuestionario();
}, [cuestionarioId]);

const handleOptionChange = (seccionId: string, preguntaId: string, valor: string) => {
    const newRespuestas: Respuestas = { ...respuestas };
    newRespuestas[seccionId] = newRespuestas[seccionId] || {};
    newRespuestas[seccionId][preguntaId] = valor;
    setRespuestas(newRespuestas);
  };

const enviarRespuestas = async () => {
    try {
      // Estructura de datos para enviar al servidor
      const data = {
        cuestionario_id: cuestionarioId,
        fecha_aplicacion: new Date(), // Puedes ajustar la fecha
        empleado_id: "65405790efda7d631e75fe0c", // Sustituye con el ID de la persona

        // Estructura de respuestas (conversión de respuestas)
        respuestas: Object.keys(respuestas).map((seccionId) => {
          return Object.keys(respuestas[seccionId]).map((preguntaId) => {
            return {
              pregunta_id: preguntaId,
              respuesta: respuestas[seccionId][preguntaId],
            };
          });
        }),
      };

      const response = await fetch(`${API_URL}/guardarRespuestas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      if (response.ok) {
        // Respuestas guardadas con éxito
        console.log("Respuestas guardadas exitosamente.");
      } else {
        // Error al guardar respuestas
        setError("Error al guardar respuestas.");
      }
    } catch (error) {
      // Error de red u otro error
      setError("Error de red");
    }
  };

  return (
    <PortalLayout>
      <div className="container mt-5 mb-5">
        {cuestionario ? (
          <Card className="mb-5">
            <Card.Header>
              <h2 className="text-center text-primary">{cuestionario.titulo}</h2>
            </Card.Header>
            <Card.Body className="mb-5">
              <p>{cuestionario.instrucciones}</p>
              <Form>
                {cuestionario.secciones.map((seccion: any) => (
                  <div key={seccion._id}>
                    <h5 className="text-primary">{seccion.nombre}</h5>
                    {seccion.preguntas.map((pregunta: any) => (
                      <Form.Group key={pregunta._id} className="mx-3 mb-4">
                        <Form.Label className="fw-500">{pregunta.pregunta}</Form.Label>
                        {cuestionario.escala.map((opcion, index) => (
                          <Form.Check
                            key={index}
                            type="radio"
                            label={opcion}
                            name={`${seccion._id}-${pregunta._id}`}
                            value={opcion}
                            onChange={(e) =>
                              handleOptionChange(
                                seccion._id,
                                pregunta._id,
                                e.target.value
                              )
                            }
                          />
                        ))}
                      </Form.Group>
                    ))}
                  </div>
                ))}
                <div className="text-center">
                    <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={enviarRespuestas}
                    >
                        Enviar respuestas
                    </button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        ) : (
          <div className="alert alert-info">Cargando cuestionario...</div>
        )}
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </PortalLayout>
  );
}
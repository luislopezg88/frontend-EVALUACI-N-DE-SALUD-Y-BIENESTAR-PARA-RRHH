import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PortalLayout from "../layout/PortalLayout";
import { API_URL } from "../auth/authConstants";
import Card from "react-bootstrap/Card";
import { Accordion } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlasses } from "@fortawesome/free-solid-svg-icons";

interface Cuestionario {
  _id: string;
  titulo: string;
  instrucciones: string;
  secciones: any[];
}

interface Resultado {
  _id: string;
  cuestionario_id: string;
  empleado_id: string;
  respuestas: any[];
  empleado: string;
  imagenes: string[];
  // Otros campos de resultado
}

export default function ListaCuestionarios() {
  const { cuestionarioId } = useParams();
  const [cuestionario, setCuestionario] = useState<Cuestionario>();
  const [error, setError] = useState<string>("");
  const [resultados, setResultados] = useState<Resultado[]>([]);
  const [preguntasMap, setPreguntasMap] = useState<any>({});
  let ultimaSeccionImpresa = "";

  async function fetchResultados(cuestionarioId: string | undefined) {
    try {
      const response = await fetch(`${API_URL}/resultados/${cuestionarioId}`);
      if (response.ok) {
        const data = await response.json();
        const empleadosData = data.body.empleados;

        const mutate = data.body.data.map((item: Resultado) => {
          const empleadoData = empleadosData.find(
            (empleado: any) => empleado._id === item.empleado_id
          );
          const empleadoNombre = `${empleadoData?.name ?? ""} ${
            empleadoData?.lastname ?? ""
          }`;

          return {
            ...item,
            empleado: empleadoNombre,
          };
        });
        setResultados(mutate);
      } else {
        setError("Error al cargar los resultados");
      }
    } catch (err) {
      setError("Error al cargar los resultados");
    }
  }

  async function fetchCuestionario(cuestionarioId: string | undefined) {
    try {
      const response = await fetch(
        `${API_URL}/cuestionarios/${cuestionarioId}`
      );
      if (response.ok) {
        const data = await response.json();
        setCuestionario(data.body.cuestionario);
        fetchResultados(cuestionarioId);

        const newPreguntasMap: any = {};
        data.body.cuestionario.secciones.forEach((seccion: any) => {
          seccion.preguntas.forEach((pregunta: any) => {
            newPreguntasMap[pregunta._id] = {
              pregunta: pregunta.pregunta,
              seccion: seccion.nombre,
            };
          });
        });

        setPreguntasMap(newPreguntasMap);
      } else {
        setError("Error al cargar la lista de cuestionarios");
      }
    } catch (err) {
      setError("Error de red");
      console.log(error);
    }
  }

  const getUrlImagen = (arreglo: any[]) => {
    return "/result-image?img=" + arreglo[0]
  }

  useEffect(() => {
    fetchCuestionario(cuestionarioId);
  }, [cuestionarioId]);

  return (
    <PortalLayout>
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <Card className="mb-5">
              <Card.Header>
                <h2 className="text-center text-primary">
                  Resultados del Cuestionario
                </h2>
                <div className="text-center text-primary">
                  {cuestionario?.titulo ?? ""}
                </div>
              </Card.Header>
              <Card.Body>
                {resultados.map((item: Resultado, index: number) => (
                  <div key={index} className="mb-3">
                    <Accordion className="px-2">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <div className="me-3">
                            Empleado: {item?.empleado ?? ""}
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          {item.respuestas && item.respuestas.length > 0 ? (
                            <ul>
                              {item.respuestas.map(
                                (respuestasGrupo: any, respIndex: number) => (
                                  <div key={respIndex}>
                                    {respuestasGrupo.map(
                                      (
                                        respuesta: any,
                                        respuestaIndex: number
                                      ) => {
                                        if (
                                          preguntasMap[respuesta.pregunta_id]
                                            .seccion !== ultimaSeccionImpresa
                                        ) {
                                          ultimaSeccionImpresa =
                                            preguntasMap[respuesta.pregunta_id]
                                              .seccion;
                                          return (
                                            <div key={respuestaIndex}>
                                              <p>
                                                <h5
                                                  className="text-center p-2"
                                                  style={{
                                                    background: "#cccccc",
                                                  }}
                                                >
                                                  {
                                                    preguntasMap[
                                                      respuesta.pregunta_id
                                                    ].seccion
                                                  }
                                                </h5>{" "}
                                              </p>
                                              <p className="mb-0">
                                                &bull;{" "}
                                                {
                                                  preguntasMap[
                                                    respuesta.pregunta_id
                                                  ].pregunta
                                                }
                                              </p>
                                              <p className="mx-2">
                                                <strong>
                                                  {respuesta.respuesta}
                                                </strong>
                                              </p>
                                            </div>
                                          );
                                        } else {
                                          return (
                                            <div key={respuestaIndex}>
                                              <p className="mb-0">
                                                &bull;{" "}
                                                {
                                                  preguntasMap[
                                                    respuesta.pregunta_id
                                                  ].pregunta
                                                }
                                              </p>
                                              <p className="mx-2">
                                                <strong>
                                                  {respuesta.respuesta}
                                                </strong>
                                              </p>
                                            </div>
                                          );
                                        }
                                      }
                                    )}
                                  </div>
                                )
                              )}
                            </ul>
                          ) : (
                            <p>No hay respuestas para este empleado.</p>
                          )}
                          <div className="d-flex justify-content-center flex-wrap">
                            {/*!item.imagenes || item.imagenes.length === 0
                              ? null
                              : item.imagenes.map((item: string) => (
                                 <img src={`/ia/${item}`} className="img-fluid px-2 py-2 w-100 w-md-50 rounded-ia"/>
                            ))*/}
                            <Link to={getUrlImagen(item.imagenes)} title="result">
                              <button>
                                ver con <FontAwesomeIcon icon={faGlasses} />
                              </button>
                            </Link>
                            
                          </div>
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

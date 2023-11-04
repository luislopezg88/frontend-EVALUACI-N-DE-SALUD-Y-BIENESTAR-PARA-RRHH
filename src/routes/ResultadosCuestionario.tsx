import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PortalLayout from "../layout/PortalLayout";
import { API_URL } from "../auth/authConstants";
import Card from "react-bootstrap/Card";
import { Accordion } from "react-bootstrap";

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
}

export default function ListaCuestionarios() {
  const { cuestionarioId } = useParams();
  const [cuestionario, setCuestionario] = useState<Cuestionario>({
    _id: "",
    titulo: "",
    instrucciones: "",
    secciones: [],
  });
  const [error, setError] = useState<string>("");
  const [resultados, setResultados] = useState<any[]>([]);

  const adapterEmpleado = (data: any, id: any) => {
    const [item] = data.filter((item: any) => item._id === id);
    return `${item?.name ?? ""} ${item?.lastname ?? ""}`;
  };

  const adapterPreguntas = (preguntas: any, id: any) => {
    const [obj] = preguntas
      .map((item: any) => item.preguntas)
      .flat()
      .filter((row: any) => row._id === id);

    return obj?.pregunta ?? "";
  };

  const adapterRespuestas = (preguntas: any, respuestas: any) => {
    const mutation = respuestas.map((subArray: any) => {
      return subArray.map((obj: any) => {
        return {
          nombre: adapterPreguntas(preguntas, obj.pregunta_id),
          pregunta_id: obj.pregunta_id,
          respuesta: obj.respuesta,
        };
      });
    });
    return mutation;
  };

  async function fetchResultados(
    cuestionarioId: string | undefined,
    preguntas: any
  ) {
    try {
      const response = await fetch(`${API_URL}/resultados/${cuestionarioId}`);
      if (response.ok) {
        const data = await response.json();

        const mutate = data.body.data.map((item: any) => {
          return {
            ...item,
            empleado: adapterEmpleado(data.body.empleados, item.empleado_id),
            respuestas: adapterRespuestas(preguntas, item?.respuestas ?? []),
          };
        });
        //console.log(mutate);
        setResultados(mutate);
      }
    } catch (error) {
      setError("Error al cargar los resultados");
    }
  }

  useEffect(() => {
    async function fetchCuestionarios() {
      try {
        const response = await fetch(
          `${API_URL}/cuestionarios/${cuestionarioId}`
        );

        if (response.ok) {
          const data = await response.json();
          setCuestionario(data.body.cuestionario);
          fetchResultados(
            cuestionarioId,
            data?.body?.cuestionario?.secciones ?? []
          );
        } else {
          setError("Error al cargar la lista de cuestionarios");
        }
      } catch (error) {
        setError("Error de red");
      }
    }

    fetchCuestionarios();
  }, [cuestionarioId]);

  return (
    <PortalLayout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-12">
            <Card>
              <Card.Header>
                <h2 className="text-center text-primary">
                  Resultados del Cuestionario
                </h2>
                <div className="text-center text-primary">
                  Cuestionario: {cuestionario?.titulo ?? ""}
                </div>
              </Card.Header>
              <Card.Body>
                {resultados.map((item, index) => (
                  <div key={index} className="mb-3">
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <div className="me-3">
                            Empleado: {item?.empleado ?? ""}
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          {!item.respuestas || item.respuestas.length === 0
                            ? null
                            : item.respuestas.map((row: any, index: number) => (
                                <div key={index}>ttt</div>
                              ))}
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

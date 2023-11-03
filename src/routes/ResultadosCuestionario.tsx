import { useState, useEffect, useMemo } from "react";
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
  secciones: any[];
}

interface Resultado {
  _id: string;
  cuestionario_id: string;
  empleado_id: string;
  respuestas: any[];
  // Otros campos de resultado
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

  async function fetchResultados(cuestionarioId: string | undefined) {
    try {
      const response = await fetch(`${API_URL}/resultados/${cuestionarioId}`);
      if (response.ok) {
        const data = await response.json();
        setResultados(data.body.data);
      }
    } catch (error) {
      setError("Error al cargar los resultados");
    }
  }

  useEffect(() => {
    //const response = await fetch(`${API_URL}/cuestionarios`);
    async function fetchCuestionarios() {
      try {
        const response = await fetch(
          `${API_URL}/cuestionarios/${cuestionarioId}`
        );

        if (response.ok) {
          const data = await response.json();
          setCuestionario(data.body.cuestionario);
          fetchResultados(cuestionarioId);
        } else {
          setError("Error al cargar la lista de cuestionarios");
        }
      } catch (error) {
        setError("Error de red");
      }
    }

    fetchCuestionarios();
  }, [cuestionarioId]);

  const adapter = (row: any) => {
    /*const result = cuestionario.secciones.filter(
      (item) => item.id == row.pregunta_id
    );*/

    return "text";
  };
  //console.log(cuestionario.secciones);

  let z = [
    [
      {
        pregunta_id: "6544214d0e960a61f7b34385",
        respuesta: "Nunca",
      },
      {
        pregunta_id: "6544214d0e960a61f7b34386",
        respuesta: "Rara vez",
      },
      {
        pregunta_id: "6544214d0e960a61f7b34387",
        respuesta: "A veces",
      },
    ],
    [
      {
        pregunta_id: "6544214d0e960a61f7b3438a",
        respuesta: "Frecuentemente",
      },
      {
        pregunta_id: "6544214d0e960a61f7b3438b",
        respuesta: "Siempre",
      },
      {
        pregunta_id: "6544214d0e960a61f7b3438c",
        respuesta: "Nunca",
      },
    ],
    [
      {
        pregunta_id: "6544214d0e960a61f7b3438e",
        respuesta: "Rara vez",
      },
      {
        pregunta_id: "6544214d0e960a61f7b34390",
        respuesta: "A veces",
      },
      {
        pregunta_id: "6544214d0e960a61f7b34391",
        respuesta: "Frecuentemente",
      },
    ],
    [
      {
        pregunta_id: "6544214d0e960a61f7b34393",
        respuesta: "Siempre",
      },
      {
        pregunta_id: "6544214d0e960a61f7b34394",
        respuesta: "Nunca",
      },
      {
        pregunta_id: "6544214d45960a61f7b34394",
        respuesta: "Rara vez",
      },
    ],
  ];

  let x = [
    {
      _id: "6544332049f7f76d31efe6bd",
      nombre: "Estado de Ánimo y Sentimientos en el Trabajo",
      preguntas: [
        {
          _id: "6544214d0e960a61f7b34385",
          pregunta: "¿Se siente triste o deprimido debido a su trabajo?",
        },
        {
          _id: "6544214d0e960a61f7b34386",
          pregunta: "¿Se siente ansioso o estresado pensando en su trabajo?",
        },
        {
          _id: "6544214d0e960a61f7b34387",
          pregunta: "¿Se siente valorado y reconocido en su puesto de trabajo?",
        },
      ],
    },
    {
      _id: "6544214d0e960a61f7b34388",
      nombre: "Experiencias de Trabajo",
      preguntas: [
        {
          _id: "6544214d0e960a61f7b3438a",
          pregunta:
            "¿Considera que sus tareas laborales son excesivamente difíciles o complejas?",
        },
        {
          _id: "6544214d0e960a61f7b3438b",
          pregunta:
            "¿Tiene suficientes recursos (tiempo, equipo, apoyo) para hacer su trabajo adecuadamente?",
        },
        {
          _id: "6544214d0e960a61f7b3438c",
          pregunta: "¿Puede desconectarse del trabajo durante su tiempo libre?",
        },
      ],
    },
    {
      _id: "6544214d0e960a61f7b3438d",
      nombre: "Relaciones Laborales",
      preguntas: [
        {
          _id: "6544214d0e960a61f7b3438e",
          pregunta:
            "¿Cómo describiría su relación con sus compañeros de trabajo?",
        },
        {
          _id: "6544214d0e960a61f7b34390",
          pregunta: "¿Cómo describiría su relación con sus superiores?",
        },
        {
          _id: "6544214d0e960a61f7b34391",
          pregunta:
            "¿Ha experimentado conflictos laborales que le afecten personal o emocionalmente?",
        },
      ],
    },
    {
      _id: "6544214d0e960a61f7b34392",
      nombre: "Satisfacción y Motivación Laboral",
      preguntas: [
        {
          _id: "6544214d0e960a61f7b34393",
          pregunta: "¿Se siente satisfecho con su trabajo actual?",
        },
        {
          _id: "6544214d0e960a61f7b34394",
          pregunta: "¿Se siente motivado para ir a trabajar cada día?",
        },
        {
          _id: "6544214d45960a61f7b34394",
          pregunta:
            "¿Siente que su trabajo tiene un propósito claro y valioso?",
        },
      ],
    },
  ];
  //let y = x.map((item) => item.preguntas);
  //console.log(y);

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
                {/* Mostrar los resultados aquí en acordeones ordenados por empleados */}
                {resultados.map((item) => (
                  <div key={item._id} className="mb-3">
                    <Accordion>
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>
                          <div className="me-3">
                            Empleado: {item.empleado_id}
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          {!item.respuestas || item.respuestas.length === 0
                            ? null
                            : item.respuestas.map((row: any) => (
                                <div>{adapter(row)}</div>
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
/*

[
 73+-   {
        "_id": "6544332049f7f76d31efe6bd",
        "nombre": "Estado de Ánimo y Sentimientos en el Trabajo",
        "preguntas": [
            {
                "_id": "6544214d0e960a61f7b34385",
                "pregunta": "¿Se siente triste o deprimido debido a su trabajo?"
            },
            {
                "_id": "6544214d0e960a61f7b34386",
                "pregunta": "¿Se siente ansioso o estresado pensando en su trabajo?"
            },
            {
                "_id": "6544214d0e960a61f7b34387",
                "pregunta": "¿Se siente valorado y reconocido en su puesto de trabajo?"
            }
        ]
    },
    {
        "_id": "6544214d0e960a61f7b34388",
        "nombre": "Experiencias de Trabajo",
        "preguntas": [
            {
                "_id": "6544214d0e960a61f7b3438a",
                "pregunta": "¿Considera que sus tareas laborales son excesivamente difíciles o complejas?"
            },
            {
                "_id": "6544214d0e960a61f7b3438b",
                "pregunta": "¿Tiene suficientes recursos (tiempo, equipo, apoyo) para hacer su trabajo adecuadamente?"
            },
            {
                "_id": "6544214d0e960a61f7b3438c",
                "pregunta": "¿Puede desconectarse del trabajo durante su tiempo libre?"
            }
        ]
    },
    {
        "_id": "6544214d0e960a61f7b3438d",
        "nombre": "Relaciones Laborales",
        "preguntas": [
            {
                "_id": "6544214d0e960a61f7b3438e",
                "pregunta": "¿Cómo describiría su relación con sus compañeros de trabajo?"
            },
            {
                "_id": "6544214d0e960a61f7b34390",
                "pregunta": "¿Cómo describiría su relación con sus superiores?"
            },
            {
                "_id": "6544214d0e960a61f7b34391",
                "pregunta": "¿Ha experimentado conflictos laborales que le afecten personal o emocionalmente?"
            }
        ]
    },
    {
        "_id": "6544214d0e960a61f7b34392",
        "nombre": "Satisfacción y Motivación Laboral",
        "preguntas": [
            {
                "_id": "6544214d0e960a61f7b34393",
                "pregunta": "¿Se siente satisfecho con su trabajo actual?"
            },
            {
                "_id": "6544214d0e960a61f7b34394",
                "pregunta": "¿Se siente motivado para ir a trabajar cada día?"
            },
            {
                "_id": "6544214d45960a61f7b34394",
                "pregunta": "¿Siente que su trabajo tiene un propósito claro y valioso?"
            }
        ]
    }
]
*/

/*

*/

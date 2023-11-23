import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PortalLayout from "../layout/PortalLayout";
import { API_URL } from "../auth/authConstants";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Button, Modal } from "react-bootstrap";
//import Alert from "react-bootstrap/Alert";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

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

const listaExperiencia = [
  { name: "Excelente", icon: "" },
  { name: "Bien", icon: "" },
  { name: "Normal", icon: "" },
  { name: "Meh", icon: "" },
  { name: "Mal", icon: "" },
];

//type Respuesta = { texto: string; img: string }[];

/*const obtenerRespuesta = (key: string, respuestas: any): Respuesta | any => {
  const map: { [key: string]: Respuesta | string } = {
    "6543fb6ca4965491c3ae340e": [
      { texto: "uno", img: "" },
      { texto: "dos", img: "" },
      { texto: "tres", img: "" },
      { texto: "cuatro", img: "" },
      { texto: "cinco", img: "" },
    ],
    "6543f73ca4976491c3ae340b": [],
    "6543fafba4976491c3ae340e": [],
    "6543fa41a4976491c3ae340d": [],
  };

  if (
    map[key] !== undefined &&
    Array.isArray(map[key]) &&
    map[key].length > 0
  ) {
    const respuesta = map[key] as Respuesta;

    const indiceAleatorio = Math.floor(Math.random() * respuesta.length);

    return respuesta[indiceAleatorio];
  } else if (map[key] === "") {
    return "La clave no tiene una respuesta asociada";
  } else {
    return "No es una clave válida o no tiene un valor de tipo arreglo";
  }
};*/

export default function ResponderCuestionario() {
  const { cuestionarioId, idempleado } = useParams();

  console.log(idempleado)
  const [cuestionario, setCuestionario] = useState<Cuestionario | null>(null);
  const [respuestas, setRespuestas] = useState<Respuestas>({});
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [seleccion, setSeleccion] = useState("");
  const [texto, setTexto] = useState("");
  //const [alert, setAlert] = useState(false);
  const [imagenes, setImagenes] = useState<any>([]);

  const [toatsData, setToatsData] = useState({
    show: false,
    title: '',
    message: '',
    bg: 'Success'
  });

  useEffect(() => {
    async function fetchCuestionario() {
      try {
        const response = await fetch(
          `${API_URL}/cuestionarios/${cuestionarioId}`
        );
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

  const handleOptionChange = (
    seccionId: string,
    preguntaId: string,
    valor: string
  ) => {
    const newRespuestas: Respuestas = { ...respuestas };

    newRespuestas[seccionId] = newRespuestas[seccionId] || {};

    newRespuestas[seccionId][preguntaId] = valor;
    setRespuestas(newRespuestas);
  };

  const enviarRespuestas = async () => {
    try {
      const data = {
        cuestionario_id: cuestionarioId,
        fecha_aplicacion: new Date(),
        empleado_id: idempleado,
        seleccion_satifaccion: seleccion,
        texto_satifaccion: texto,
        imagenes: imagenes,
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

      if (response.ok) {
        setShow(false);
        //setAlert(true);
        setToatsData({ show: true, title: 'Éxito', message: 'Cuestionario guardado existosamente', bg: 'Success' });
      } else {
        setToatsData({ show: true, title: 'Atención', message: 'Error al guardar respuestas', bg: 'Danger' });
        setError("Error al guardar respuestas.");
      }
    } catch (error) {
      setError("Error de red");
      setToatsData({ show: true, title: 'Atención', message: 'Error de red', bg: 'Danger' });
    }
  };

  const enviarExperiancia = async () => {
    setShow(true);
    handlePermuta();
  };

  const handleClose = () => setShow(!show);

  const handlePermuta = () => {
    const flattenObject = Object.values(respuestas).reduce(
      (acc: any, nested: any) => {
        return { ...acc, ...nested };
      },
      {}
    );

    let nuncaCount = 0;
    let raraVezCount = 0;
    let vecesCount = 0;
    let frecuentementeCount = 0;
    let siempreCount = 0;
    // Recorremos el objeto
    for (const key in flattenObject) {
      if (flattenObject[key] === "Nunca") {
        nuncaCount++;
      } else if (flattenObject[key] === "Rara vez") {
        raraVezCount++;
      } else if (flattenObject[key] === "A veces") {
        vecesCount++;
      } else if (flattenObject[key] === "Frecuentemente") {
        frecuentementeCount++;
      } else if (flattenObject[key] === "Siempre") {
        siempreCount++;
      }
    }

    const result: any = {
      Nunca: nuncaCount,
      "Rara vez": raraVezCount,
      "A veces": vecesCount,
      Frecuentemente: frecuentementeCount,
      Siempre: siempreCount,
    };

    if (result["Nunca"] >= 8) {
      setImagenes([
        "satisfecho-360.jpeg",
        "satisfecho-1.jpg",
        "satisfecho-con-el-trabajo.jpg",
        "satisfecho-con-el-trabajo-1.jpg",
      ]);
    } else if (result["Siempre"] >= 8) {
      setImagenes([
        "quemado-360.jpg",
        "quemado-1.jpg",
        "quemado-2.jpg",
        "quemado-3.jpg",
      ]);
    } else if (result["Frecuentemente"] >= 8) {
      setImagenes([
        "insatisfecho-360.jpeg",
        "insatisfecho-1.jpg",
        "mala-relacion-laboral-1.jpg",
      ]);
    } else if (result["A veces"] >= 8) {
      setImagenes(["neutral.jpg", "neutral-1.jpg", "neutral-2.jpg"]);
    } else if (result["Raramente"] >= 8) {
      setImagenes([
        "buena-relacion-360.jpeg",
        "buena-relacion-laboral-1.jpg",
      ]);
    } else if (result["Frecuentemente"] >= 7) {
      setImagenes(["agotado-360.jpeg", "agotado-1.jpg", "agotado-2.jpg"]);
    } else if (result["A veces"] >= 7) {
      setImagenes(["agotado-360.jpeg", "cansado-2.jpg"]);
    } else if (result["Siempre"] >= 6) {
      setImagenes([
        "insatisfecho-360.jpeg",
        "insatisfecho-1.jpg",
        "estresado-1.jpg",
      ]);
    } else if (result["Frecuentemente"] >= 6) {
      setImagenes(["confundido-360.jpg", "confundido-1.jpg"]);
    } else if (result["A veces"] >= 6) {
      setImagenes(["buena-relacion-360"]);
    } else if (result["Siempre"] >= 5) {
      setImagenes(["agotado-2.jpg", "estresado.jpg"]);
    } else if (result["Frecuentemente"] >= 5) {
      setImagenes(["agotado-360.jpeg"]);
    } else if (result["Raramente"] >= 5) {
      setImagenes(["buena-relacion-360.jpeg", "cansado.jpg"]);
    } else {
      setImagenes(["buena-relacion-360.jpeg", "indiferente.jpg", "cansado.jpg"]);
    }
  };
  return (
    <PortalLayout>
      {/*<Alert
        show={alert}
        variant="primary"
        onClose={() => setAlert(false)}
        dismissible
      >
        <Alert.Heading>Completado!</Alert.Heading>
        <p>Cuestionario guardado existosamente .</p>
      </Alert>*/}
      <div className="container mt-5 mb-5">
        {cuestionario ? (
          <Card className="mb-5">
            <Card.Header>
              <h2 className="text-center text-primary">
                {cuestionario.titulo}
              </h2>
            </Card.Header>
            <Card.Body className="mb-5">
              <p>{cuestionario.instrucciones}</p>
              <Form>
                {cuestionario.secciones.map((seccion: any) => (
                  <div key={seccion._id}>
                    <h5 className="text-primary">{seccion.nombre}</h5>
                    {seccion.preguntas.map((pregunta: any) => (
                      <Form.Group key={pregunta._id} className="mx-3 mb-4">
                        <Form.Label className="fw-500">
                          {pregunta.pregunta}
                        </Form.Label>
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
                    onClick={enviarExperiancia}
                    //onClick={enviarRespuestas}
                  >
                    Finalizar
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
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Evalúanos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="text-center mb-4">¿Como nos calificarías?</h2>
          <div className="d-flex justify-content-center flex-wrap mt-2 mb-4">
            {listaExperiencia.map((item, index) => (
              <div key={index} className="me-2 mb-2">
                <div></div>
                <Button
                  variant={seleccion === item.name ? "secondary" : "primary"}
                  className={`btn-sm px-2`}
                  onClick={() => {
                    setSeleccion(item.name);
                  }}
                >
                  {item.name}
                </Button>
              </div>
            ))}
          </div>
          <div>
            <h6 className="mb-0">¿Como podemos mejorar?</h6>
            <textarea
              className="w-100"
              value={texto}
              onChange={(e) => {
                setTexto(e.target.value);
              }}
            ></textarea>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="primary" //onClick={enviarExperiancia}
            onClick={enviarRespuestas}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
        <ToastContainer
            className="p-3"
            position={'bottom-end'}
            style={{ zIndex: 1 }}
          >
            <Toast 
              bg={toatsData.bg}
              onClose={() => setToatsData({ show: false, title: '', message: '', bg: 'Success' })} show={toatsData.show} delay={3000} autohide>
              <Toast.Header> 
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">{toatsData.title}</strong>
              </Toast.Header>
              <Toast.Body>{toatsData.message}</Toast.Body>
            </Toast>
        </ToastContainer>
    </PortalLayout>
  );
}

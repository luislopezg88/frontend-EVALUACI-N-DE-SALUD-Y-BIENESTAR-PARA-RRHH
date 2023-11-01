import { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";

interface Todo {
  _id: any;
  fecha: string;
  inicia: string;
  finaliza: string;
  extra: string;
}

/*const tmp = [
  {
    _id: "5",
    fecha: "20/19/2019",
    inicia: "10:00:00",
    finaliza: "10:00:00",
    extra: "10:00:00",
  },
];*/
export default function Seguimiento() {
  const auth = useAuth();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState(false);
  const [fecha, setFecha] = useState("");
  const [inicia, setInicia] = useState("");
  const [finaliza, setFinaliza] = useState("");
  const [extra, setExtra] = useState("");

  async function getTodos() {
    const accessToken = auth.getAccessToken();
    try {
      const response = await fetch(`${API_URL}/horas`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        setTodos(json);
      }
    } catch (error) {
      setError(false);
    }
  }

  async function createTodo() {
    if (fecha.length > 3) {
      try {
        const response = await fetch(`${API_URL}/horas`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify({ fecha, inicia, finaliza, extra }),
        });
        if (response.ok) {
          const todo = (await response.json()) as Todo;
          setTodos([...todos, todo]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    getTodos();
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    createTodo();
  }

  return (
    <PortalLayout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <form onSubmit={handleSubmit} className="form">
            <h1>Seguimiento de horas trabajadas</h1>

            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">
                Fecha
              </label>
              <input
                type="date"
                className="form-control"
                id="fecha"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inicia" className="form-label">
                Hora entrada
              </label>
              <input
                type="time"
                className="form-control"
                id="inicia"
                value={inicia}
                onChange={(e) => setInicia(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inicia" className="form-label">
                Hora salida
              </label>
              <input
                type="time"
                className="form-control"
                id="inicia"
                value={finaliza}
                onChange={(e) => setFinaliza(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inicia" className="form-label">
                Horas extras
              </label>
              <input
                type="number"
                className="form-control"
                id="inicia"
                value={extra}
                onChange={(e) => setExtra(e.target.value)}
              />
            </div>

            <button>Registrar seguimiento</button>
          </form>
        </div>
        <div className="row mt-5">
          <div className="col-12">
            {error ? (
              <div className="alert alert-danger">
                Error al carga tu solicitud
              </div>
            ) : todos.length === 0 ? null : (
              <div className="table-responsive">
                <table className="table table-striped mb-5">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Hora entrada</th>
                      <th>Hora salida</th>
                      <th>Hora extra</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todos.length === 0 ? (
                      <tr>
                        <td colSpan={4}>Sin registros</td>
                      </tr>
                    ) : (
                      todos.map((item: any, index: number) => (
                        <tr key={index}>
                          <td>{item?.fecha ?? ""}</td>
                          <td>{item?.inicia ?? ""}</td>
                          <td>{item?.finaliza ?? ""}</td>
                          <td>{item?.extra ?? ""}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

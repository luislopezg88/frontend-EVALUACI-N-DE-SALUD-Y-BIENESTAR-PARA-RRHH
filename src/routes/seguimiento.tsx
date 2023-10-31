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

export default function Seguimiento() {
  const auth = useAuth();

  const [todos, setTodos] = useState<Todo[]>([]);
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
      console.log(error);
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
      <form onSubmit={handleSubmit} className="form">
        <h1>Seguimiento de horas trabajadas</h1>
        <label>Fecha</label>
        <input
          type="date"
          placeholder="Fecha..."
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          className="espacio"
        />

        <label>Hora entrada</label>
        <input
          type="time"
          placeholder="Hora..."
          value={inicia}
          onChange={(e) => setInicia(e.target.value)}
          className="espacio"
        />
        <label>Hora salida</label>
        <input
          type="time"
          placeholder="Hora..."
          value={finaliza}
          onChange={(e) => setFinaliza(e.target.value)}
          className="espacio"
        />
        <label>Horas extras</label>
        <input
          type="time"
          placeholder="Hora..."
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
          className="espacio"
        />
        <button>Registrar seguimiento</button>
      </form>
      <div className="accordion">
        {todos.map((post: Todo) => (
          <div key={post._id}>
            <h3>Fecha:{post?.fecha}</h3>
            <p>
              incia:{post.inicia} / Finaliza:{post.finaliza} / horas extras:
              {post?.extra ?? ""}
            </p>
          </div>
        ))}
      </div>
    </PortalLayout>
  );
}

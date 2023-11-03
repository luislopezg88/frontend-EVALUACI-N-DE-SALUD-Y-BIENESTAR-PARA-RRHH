import { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";

export default function CreateTaks() {
  const auth = useAuth();
  let navigate = useNavigate();
  const [name, setFecha] = useState("");
  const [description, setInicia] = useState("");
  const [errors, setErrors] = useState({
    show: false,
    message: '',
  });

  async function createTaks() {
    try {
      const response = await fetch(`${API_URL}/taks/save/${auth.getUser()?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({ name, description }),
      });
      if (response.ok) {
        navigate('/home', { replace: true });
      }
    } catch (error) {
      setErrors({ show: true, message: 'Ocurrio un error intente nuevamente' })
      console.log(error);
    }
  }

  useEffect(() => {
  
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (name == '' || description == '') {
      setErrors({ show: true, message: 'Todos los campos son Requeridos' })
    } else { 
      createTaks();
    }
  }

  return (
    <PortalLayout>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <form onSubmit={handleSubmit} className="form">
            <h2 className="text-center text-primary ">
              Registrar rutina
            </h2>

            <div className="mb-3">
              <label htmlFor="fecha" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={name}
                onChange={(e) => setFecha(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inicia" className="form-label">
                Descripción
              </label>
              <textarea
                className="form-control"
                id="description"
                value={description}
                onChange={(e) => setInicia(e.target.value)}
              />
            </div>
            <div className="row mb-3">
              <div className="col-12">
                {errors.show && (
                  <div className="alert alert-danger">
                    {errors.message}
                  </div>
                )}
              </div>
            </div>
            <button>Guardar</button>
          </form>
        </div>
        
      </div>
    </PortalLayout>
  );
}

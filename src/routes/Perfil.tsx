import { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";


export default function Perfil() {
  const auth = useAuth();
  const [address, setAddres] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState(false);

  async function getProfile() {
    const accessToken = auth.getAccessToken();
    console.log(auth.getUser())
    try {
      const response = await fetch(`${API_URL}/perfil/${auth.getUser()?.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        const json = await response.json();
        console.log('json', json)
        if(json.body?.perfil) {
          setAddres(json.body?.perfil.address)
          setPhone(json.body?.perfil.phone)
          setQualification(json.body?.perfil.qualification)
          setBirthdate(json.body?.perfil.birthdate)
        }
        //setTodos(json);
      }
    } catch (error) {
      setError(false);
    }
  }

  useEffect(() => {
    getProfile();
  }, [auth]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if(address == '' && phone == '' && qualification == '' && birthdate == ''){
      return
    } else {
      try {
        const response = await fetch(`${API_URL}/perfil/save/${auth.getUser()?.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
          body: JSON.stringify({ address, phone, qualification, birthdate }),
        });
        if (response.ok) {
          /*const todo = (await response.json()) as Todo;
          setTodos([...todos, todo]);*/
          alert("datos actualizados")
        }
      } catch (error) {
        console.log(error);
      }
    }
    //getProfile();
  }

  return (
    <PortalLayout>
      <div className="container mt-5">
        <div className="card">
          <div className="card-header">
            <h2 className="text-center text-primary ">
              Perfil de {auth.getUser()?.name ?? ""}
            </h2>
          </div>
          <div className="card-body">

            <form onSubmit={handleSubmit}>

              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="fecha" className="form-label">
                      Dirección
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      value={address}
                      onChange={(e) => setAddres(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="inicia" className="form-label">
                      télefono
                    </label>
                    <input
                      type="phone"
                      className="form-control"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="inicia" className="form-label">
                      Fecha de Nacimiento
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="birthdate"
                      value={birthdate}
                      onChange={(e) => setBirthdate(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-12 col-md-6">
                  <div className="mb-3">
                    <label htmlFor="inicia" className="form-label">
                      Profesión
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="qualification"
                      value={qualification}
                      onChange={(e) => setQualification(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-center">
                <button type="submit">Actualizar Perfil</button>
              </div>
              
            </form>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}

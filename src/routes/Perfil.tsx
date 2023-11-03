import { useEffect, useState } from "react";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

export default function Perfil() {
  const auth = useAuth();
  const [address, setAddres] = useState("");
  const [phone, setPhone] = useState("");
  const [qualification, setQualification] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [toatsData, setToatsData] = useState({
    show: false,
    title: '',
    message: '',
    bg: 'Success'
  });
 
  async function getProfile() {
    const accessToken = auth.getAccessToken();
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
        if(json.body?.perfil) {
          setAddres(json.body?.perfil.address)
          setPhone(json.body?.perfil.phone)
          setQualification(json.body?.perfil.qualification)
          const getArrayDate = json.body?.perfil.birthdate.split('T');
          setBirthdate(getArrayDate[0])
        }
      }
    } catch (error) {
      console.log(error);
      setToatsData({ show: true, title: 'Atención', message: 'Ocurrio un error intente nuevamente', bg: 'Danger' });
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
          setToatsData({ show: true, title: 'Éxito', message: 'Perfil actualizado correctamente', bg: 'Success' });
        }
      } catch (error) {
        setToatsData({ show: true, title: 'Atención', message: 'Ocurrio un error intente nuevamente', bg: 'Danger' });
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

          <ToastContainer
            className="p-3"
            position={'top-end'}
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

      </div>
    </PortalLayout>
  );
}

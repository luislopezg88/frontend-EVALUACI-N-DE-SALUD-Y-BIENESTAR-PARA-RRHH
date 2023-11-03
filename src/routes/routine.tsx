import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PortalLayout from "../layout/PortalLayout";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import { converDatetoString } from "../helpers/indes";

interface Taks {
  _id?: string;
  name: string;
  description: string;
  completed: boolean;
  created: Date,
  user: any;
}

export default function Routine() {
  const auth = useAuth();
  const [task, setTaks] = useState<Taks[]>([]);
  
  useEffect(() => {
    getTaks()
  }, []);


  async function getTaks() {
    const accessToken = auth.getAccessToken();
    const today = converDatetoString(new Date());
    try {
      const response = await fetch(`${API_URL}/taks/today/${auth.getUser()?.id}/date/${today}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.ok) {
        const json = await response.json();
        if(json?.body?.tareas){
          setTaks(json?.body?.tareas);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (

    <PortalLayout>
      <div className="container">
        <div className="card mt-5">
          <div className="card-header">
              <h2 className="text-center text-primary">
                Tareas de {auth.getUser()?.name ?? ""}
              </h2>
          </div>
          <div className="card-body">

            <div className="row">
              <div className="col-12">
                <div className="d-flex justify-content-end">
                  <Link to="/savetaks" title="home">
                    <button className="btn btn-primary btn-sm">
                      Crear
                    </button>
                  </Link> 
                </div>
              </div> 
            </div>

            <div className="row">
              <div className="col-12">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Nombre</th>
                        <th>descrición</th>
                        <th>Completada</th>
                      </tr>
                    </thead>
                    <tbody>
                      {task.map((tak: Taks) =>(
                        <tr key={tak._id}>
                          <td>{tak.name}</td>
                          <td>{tak.description}</td>
                          <td>{tak.completed}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
    
  );
}

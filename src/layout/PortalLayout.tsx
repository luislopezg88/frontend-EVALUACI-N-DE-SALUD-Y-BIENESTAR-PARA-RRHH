import { Link } from "react-router-dom";
import React, { MouseEvent } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import "../assets/css/layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDashboard,
  faBook,
  faCodeBranch,
  faPowerOff,
  faUsers,
  faUser,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

interface PortalLayoutProps {
  children?: React.ReactNode;
}
export default function PortalLayout({ children }: PortalLayoutProps) {
  const auth = useAuth();

  async function handleSignOut(e: MouseEvent) {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/signout`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getRefreshToken()}`,
        },
      });
      if (response.ok) {
        auth.signout();
      }
    } catch (error) {
      console.log(error);
    }
  }
  console.log(auth.getUser());
  return (
    <>
      <main>{children}</main>
      <div className="botom-menu">
        {auth.getUser()?.tipo == "employee" ? (
          <nav>
            <ul>
              <li>
                <Link to="/dashboard" title="dashboard">
                  <FontAwesomeIcon icon={faDashboard} />
                </Link>
              </li>
              <li>
                <Link to="/profile" title="Perfil">
                  <FontAwesomeIcon icon={faUser} />
                </Link>
              </li>
              <li>
                <Link to="/biblioteca" title="Biblioteca de Recursos">
                  <FontAwesomeIcon icon={faBook} />
                </Link>
              </li>
              <li>
                <Link to="/followup" title="Seguimiento">
                  <FontAwesomeIcon icon={faCodeBranch} />
                </Link>
              </li>
              <li>
                <a href="#" onClick={handleSignOut} title="Salir">
                  <FontAwesomeIcon icon={faPowerOff} />
                </a>
              </li>
            </ul>
          </nav>
        ) : (
          <nav>
            <ul>
              <li>
                <Link to="/dashboard" title="dashboard">
                  <FontAwesomeIcon icon={faDashboard} />
                </Link>
              </li>
              <li>
                <Link to="/empleados" title="Empleados">
                  <FontAwesomeIcon icon={faUsers} />
                </Link>
              </li>
              <li>
                <Link to="/encuesta" title="encuesta">
                  <FontAwesomeIcon icon={faPen} />
                </Link>
              </li>
              <li>
                <a href="#" onClick={handleSignOut} title="Salir">
                  <FontAwesomeIcon icon={faPowerOff} />
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  );
}

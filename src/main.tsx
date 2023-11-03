import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login.tsx";
import Signup from "./routes/Signup.tsx";
import { AuthProvider } from "./auth/AuthProvider.tsx";
import Home from "./routes/Home.tsx";
import ProtectedRoute from "./routes/ProtectedRoute.tsx";
import Empleado from "./routes/Empleado.tsx";
import Empleados from "./routes/Empleados.tsx";
import Biblioteca from "./routes/Biblioteca.tsx";
import Seguimiento from "./routes/seguimiento.tsx";
import Perfil from "./routes/Perfil.tsx";
import CreateTaks from "./routes/CreateTaks.tsx";
import Cuestionarios from "./routes/Cuestionarios.tsx";
import ResponderCuestionario from "./routes/ResponderCuestionario";
import ResultadosCuestionario from "./routes/ResultadosCuestionario.tsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/me",
        element: <Empleado />,
      },
      {
        path: "/empleados",
        element: <Empleados />,
      },
      {
        path: "/biblioteca",
        element: <Biblioteca />,
      },
      {
        path: "/followup",
        element: <Seguimiento />,
      },
      {
        path: "/profile",
        element: <Perfil />,
      },
      {
        path: "/cuestionarios/:idempleado",
        element: <Cuestionarios />,
      },
      {
        path: "/responder/:cuestionarioId/:idempleado",
        element: <ResponderCuestionario />,
      },
      {
        path: "/cuestionarios/:cuestionarioId",
        element: <ResultadosCuestionario />,
      },
      {
        path: "/savetaks",
        element: <CreateTaks />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

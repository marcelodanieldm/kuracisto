
import React from "react";
import { createRoot } from "react-dom/client";

const mountReactComponent = (id, Component) => {
  const el = document.getElementById(id);
  if (el) {
    createRoot(el).render(<Component />);
  }
};

import DashboardAdmin from "../components/DashboardAdmin";
mountReactComponent("react-dashboard-admin", DashboardAdmin);
import Confirmacion from "../components/Confirmacion";
mountReactComponent("react-confirmacion", Confirmacion);

import Home from "../components/Home";
import DashboardMedico from "../components/DashboardMedico";
import DashboardEmpleado from "../components/DashboardEmpleado";

import Login from "../components/Login";

import Registro from "../components/Registro";
import Perfil from "../components/Perfil";

mountReactComponent("react-home", Home);
mountReactComponent("react-dashboard-medico", DashboardMedico);
mountReactComponent("react-dashboard-empleado", DashboardEmpleado);

mountReactComponent("react-login", Login);

mountReactComponent("react-registro", Registro);
mountReactComponent("react-perfil", Perfil);

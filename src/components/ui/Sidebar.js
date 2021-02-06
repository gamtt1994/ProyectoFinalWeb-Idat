import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="md:w-1/5 xl:w-1/5 bg-gray-800">
      <div className="p-6">
        <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">
          Supervisor
        </p>

        <nav className="mt-10">
          <NavLink
            className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"
            activeClassName="text-yellow-500"
            exact="true"
            to="/ordenes"
          >
            Ordenes Pendientes
          </NavLink>
          <NavLink
            className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"
            activeClassName="text-yellow-500"
            exact="true"
            to="/ordenescompletados"
          >
            Ordenes Completados
          </NavLink>
          <NavLink
            className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"
            activeClassName="text-yellow-500"
            exact="true"
            to="/personal"
          >
            Personal
          </NavLink>
          <NavLink
            className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"
            activeClassName="text-yellow-500"
            exact="true"
            to="/producto"
          >
            Productos
          </NavLink>
          <NavLink
            className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"
            activeClassName="text-yellow-500"
            exact="true"
            to="/"
          >
            Cerrar Sesión
          </NavLink>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;

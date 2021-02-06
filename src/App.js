import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router";

import firebase, { FirebaseContext } from "./firebase";

import Ordenes from "./components/paginas/Ordenes";
import OrdenesCompletados from "./components/paginas/OrdenesCompletados";
import Menu from "./components/paginas/Menu";
import Personal from "./components/paginas/Personal";
import NuevoProducto from "./components/paginas/NuevoProducto";
import NuevoPersonal from "./components/paginas/NuevoPersonal";
import Sidebar from "./components/ui/Sidebar";
import Login from "./components/paginas/login";

function App() {
  return (
    <FirebaseContext.Provider
      value={{
        firebase,
      }}
    >
      <div className="md:w-4/5 xl:w-full ">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/ordenes" element={<Ordenes />} />
          <Route path="/ordenescompletados" element={<OrdenesCompletados />} />
          <Route path="/producto" element={<Menu />} />
          <Route path="/personal" element={<Personal />} />
          <Route path="/nuevo-producto" element={<NuevoProducto />} />
          <Route path="/nuevo-personal" element={<NuevoPersonal />} />
        </Routes>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;

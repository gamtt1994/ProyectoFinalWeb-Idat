import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../firebase";
import Sidebar from "../ui/Sidebar";
import Producto from "../ui/Producto";

const Menu = () => {
  // definir el state para los platillos
  const [platillos, guadarPlatillos] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  // consultar la base de datos al cargar
  useEffect(() => {
    const obtenerPlatillos = () => {
      firebase.db.collection("productos").onSnapshot(manejarSnapshot);
    };
    obtenerPlatillos();
  }, []);

  // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
  function manejarSnapshot(snapshot) {
    const platillos = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    // almacenar los resultados en el state
    guadarPlatillos(platillos);
  }

  return (
    <>
      <div className="md:flex min-h-screen">
        <Sidebar />
        <div className="container  mx-auto px-4 md:px-12 md:w-full ">
          <Link
            to="/nuevo-producto"
            className="  bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 mt-4 text-white uppercase font-bold"
          >
            Agregar Producto
          </Link>
          <div className="flex flex-wrap -mx-1 lg:-mx-4 ">
            {platillos.map((productos) => (
              <Producto key={productos.id} productos={productos} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;

import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FirebaseContext } from "../../firebase";
import Sidebar from "../ui/Sidebar";
import Personal from "../ui/Personal";

const Menu = () => {
  // definir el state para los platillos
  const [personal, guadarPersonal] = useState([]);

  const { firebase } = useContext(FirebaseContext);

  // consultar la base de datos al cargar
  useEffect(() => {
    const obtenerPersonal = () => {
      firebase.db.collection("personal").onSnapshot(manejarSnapshot);
    };
    obtenerPersonal();
  }, []);

  // Snapshot nos permite utilizar la base de datos en tiempo real de firestore
  function manejarSnapshot(snapshot) {
    const personal = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    // almacenar los resultados en el state
    guadarPersonal(personal);
  }

  return (
    <>
      <div className="md:flex min-h-screen w-full">
        <Sidebar />
        <div className="container  mx-auto px-4 md:px-12 md:w-full ">
          <Link
            to="/nuevo-personal"
            className="  bg-blue-800 hover:bg-blue-700, inline-block p-2 mt-4 text-white uppercase font-bold"
          >
            Agregar Trabajador
          </Link>
          <div className="flex flex-wrap -mx-1 lg:-mx-4 ">
            {personal.map((personal) => (
              <Personal key={personal.id} personal={personal} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;

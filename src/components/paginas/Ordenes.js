import React, { useEffect, useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";
import Orden from "../ui/Orden";
import Sidebar from "../ui/Sidebar";

const Ordenes = () => {
  // context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  // state con las ordenes
  const [ordenes, guardarOrdenes] = useState([]);

  useEffect(() => {
    const obtenerOrdenes = () => {
      firebase.db
        .collection("ordenes")
        .where("completado", "==", false)
        .onSnapshot(manejarSnapshot);
    };
    obtenerOrdenes();
  }, []);

  function manejarSnapshot(snapshot) {
    const ordenes = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    guardarOrdenes(ordenes);
  }

  return (
    <>
      <div className="md:flex min-h-screen w-full">
        <Sidebar />
        <div className="container  mx-auto px-4 md:px-12 md:w-full ">
          <h1 className="text-3xl font-light mb-4">Ordenes</h1>

          <div className="flex flex-wrap -mx-1 lg:-mx-4 ">
            {ordenes.map((orden) => (
              <Orden key={orden.id} orden={orden} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Ordenes;

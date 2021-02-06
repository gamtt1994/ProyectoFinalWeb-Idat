import React, { useContext, useRef } from "react";
import { FirebaseContext } from "../../firebase";

const Productos = ({ productos }) => {
  // Existencia ref para acceder al valor directamente
  const existenciaRef = useRef(productos.existencia);

  // context de firebase para cambios en la BD
  const { firebase } = useContext(FirebaseContext);

  const { id, nombre, imagen, existencia, precio, descripcion } = productos;

  // modificar el estado del platillo en firebase
  const actualizarDisponibilidad = () => {
    const existencia = existenciaRef.current.value === "true";

    try {
      firebase.db.collection("productos").doc(id).update({
        existencia,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarProducto = async (id) => {
    try {
      await firebase.db.collection("productos").doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3  ">
      <p className="text-center text-blue-900 underline pl-4 pr-4 pb-2">
        {nombre.toUpperCase()}
      </p>
      <article className="overflow-hidden rounded-lg shadow-lg border-2 transition  hover:bg-white duration-500 transform hover:-translate-y-1 hover:scale-110 border-blue-400 border-opacity-75">
        <div className="grid justify-items-end w-full">
          <button
            className=" grid justify-items-end w-9 h-9 rounded-md text-white  hover:bg-red-700  "
            type="button"
          >
            <svg
              className="w-6 h-6"
              fill="red"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </div>

        <div className="grid justify-items-center w-full">
          <img
            alt={imagen}
            className="grid justify-items-center h-32  rounded-lg  "
            src={imagen}
          />
        </div>

        <section className="p-2">
          <p className="text-center text-blue-900 underline pl-4 pr-4 pb-2">
            Precio: S/.{precio}
          </p>
          <p className="text-center text-blue-900 underline pl-4 pr-4 pb-2">
            {descripcion}
          </p>
          <select
            className="bg-white shadow border rounded w-full  leading-tight focus:outline-none focus:shadow-outline pl-4 pr-4 mb-2"
            value={existencia}
            ref={existenciaRef}
            onChange={() => actualizarDisponibilidad()}
          >
            <option value="true">Disponible</option>
            <option className=" text-red-500" value="false">
              No Disponible
            </option>
          </select>
        </section>
      </article>
    </div>
  );
};

export default Productos;

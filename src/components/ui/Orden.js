import React, { useState, useContext } from "react";
import { FirebaseContext } from "../../firebase";

const Orden = ({ orden }) => {
  const [tiempoentrega, guardarTiempoEntrega] = useState(0);

  // Context de firebase
  const { firebase } = useContext(FirebaseContext);

  // define el tiempo de entrega en tiempo real
  const definirTiempo = (id) => {
    try {
      firebase.db.collection("ordenes").doc(id).update({
        tiempoentrega,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Completa el estado de una orden
  const completarOrden = (id) => {
    try {
      firebase.db.collection("ordenes").doc(id).update({
        completado: true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3  ">
      <article className="overflow-hidden rounded-lg shadow-lg border-2 transition hover:bg-white duration-500 transform hover:-translate-y-1 hover:scale-110 border-blue-400 border-opacity-75">
        <div className="grid justify-items-end w-full">
          <button
            className=" grid justify-items-end w-9 h-9 rounded-md text-white hover:bg-red-700  "
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
            alt="1"
            className="block justify-center h-32 w-1/2 rounded-lg "
            src={
              "https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fGJ1aWxkaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            }
          />
        </div>
        <section className="p-2">
          {orden.orden.map((platillos) => (
            <p className="text-gray-600">
              {" "}
              {platillos.cantidad} {platillos.nombre}{" "}
            </p>
          ))}
        </section>
        <footer className=" leading-none p-2 md:p-4">
          <p className="text-gray-700 font-bold">
            Total a Pagar: S/ {orden.total}
          </p>
          {orden.tiempoentrega === 0 && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Tiempo estimado de aprovación
              </label>

              <input
                type="number"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline  "
                min="1"
                max="20"
                placeholder="20"
                value={tiempoentrega}
                onChange={(e) => guardarTiempoEntrega(parseInt(e.target.value))}
              />

              <button
                onClick={() => definirTiempo(orden.id)}
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
              >
                Definir Tiempo
              </button>
            </div>
          )}

          {orden.tiempoentrega > 0 && (
            <p className="text-gray-700">
              Tiempo de Entrega:
              <span className="font-bold"> {orden.tiempoentrega} Minutos</span>
            </p>
          )}

          {!orden.completado && orden.tiempoentrega > 0 && (
            <button
              type="button"
              className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold"
              onClick={() => completarOrden(orden.id)}
            >
              Marcar como lista
            </button>
          )}
        </footer>
      </article>
    </div>
  );
};

export default Orden;

import React, { useContext, useRef, useState } from "react";
import { FirebaseContext } from "../../firebase";

const Personal = ({ personal }) => {
  // Existencia ref para acceder al valor directamente
  const existenciaRef = useRef(personal.existencia);
  const fechaRef = useRef(personal.fechaculminacionSeguroMedico);
  const fechaSCTRRef = useRef(personal.fechaculminacionSeguroSCTR);

  // context de firebase para cambios en la BD
  const { firebase } = useContext(FirebaseContext);

  const {
    id,
    nombre,
    apellido,
    existencia,
    imagen,
    seguromedico,
    sctr,
    fechaculminacionSeguroSCTR,
    fechaculminacionSeguroMedico,
  } = personal;

  const [datos, setDatos] = useState({
    fechavigenciaSeguroMedico: "",
    fechavigenciaSeguroSCTR: "",
  });

  let f = new Date();
  let fechaActual =
    f.getFullYear() + "/" + (f.getMonth() + 1) + "/" + f.getDate();

  const actualizarDisponibilidad = () => {
    const existencia = existenciaRef.current.value === "true";
    console.log(existencia);
    try {
      firebase.db.collection("personal").doc(id).update({
        existencia,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
    });
  };

  const actualizarFechas = (event) => {
    const fechaculminacionSeguroMedico = datos.fechavigenciaSeguroMedico;
    const fechaculminacionSeguroSCTR = datos.fechavigenciaSeguroSCTR;
    const existencia = existenciaRef.current.value === "false";

    try {
      firebase.db.collection("personal").doc(id).update({
        fechaculminacionSeguroMedico,
        existencia,
        fechaculminacionSeguroSCTR,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarPersonal = async (id) => {
    try {
      await firebase.db.collection("personal").doc(id).delete();
    } catch (error) {
      console.log(error);
    }
  };

  let fechafinSeguroMedico = (
    (Date.parse(fechaculminacionSeguroMedico) - Date.parse(fechaActual)) /
    (1000 * 60 * 60 * 24)
  ).toFixed();

  let fechafinSCTR = (
    (Date.parse(fechaculminacionSeguroSCTR) - Date.parse(fechaActual)) /
    (1000 * 60 * 60 * 24)
  ).toFixed();

  if (fechafinSeguroMedico <= 0 || fechafinSCTR <= 0) {
    const existencia = existenciaRef.current.value === "true";
    try {
      firebase.db.collection("personal").doc(id).update({
        existencia,
      });
    } catch (error) {
      console.log(error);
    }
  } else {
  }

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
            alt={imagen}
            className="block justify-center h-32 w-1/2 rounded-lg "
            src={imagen}
          />
        </div>
        <section className="p-2">
          <p className="text-center text-blue-900 underline pl-4 pr-4 pb-2">
            {nombre.toUpperCase()} {apellido.toUpperCase()}
          </p>
          {(fechafinSeguroMedico <= 0 || fechafinSCTR <= 0) == true ? (
            <div>
              <select
                className="bg-white shadow border rounded w-full  leading-tight focus:outline-none focus:shadow-outline pl-4 pr-4 "
                value={existencia}
                ref={existenciaRef}
                onChange={() => actualizarDisponibilidad()}
                disabled
              >
                <option value="true">Apto</option>
                <option className=" text-red-500" value="false">
                  No Apto/Indisciplina
                </option>
              </select>
              <form onSubmit={() => actualizarFechas()}>
                <div className="w-full mb-4 mr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fechavigenciaSeguroMedico"
                  >
                    Nueva Fecha de Culminación Seguro Médico
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fechavigenciaSeguroMedico"
                    name="fechavigenciaSeguroMedico"
                    type="date"
                    defaultValue={fechaculminacionSeguroMedico}
                    ref={fechaRef}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="w-full mb-4 mr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fechavigenciaSeguroSCTR"
                  >
                    Nueva Fecha de Culminación SCTR
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fechavigenciaSeguroSCTR"
                    name="fechavigenciaSeguroSCTR"
                    type="date"
                    defaultValue={fechaculminacionSeguroSCTR}
                    ref={fechaSCTRRef}
                    onChange={handleInputChange}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                  value="Agregar Personal"
                >
                  Actualizar
                </button>
              </form>
            </div>
          ) : (
            <div>
              <select
                className="bg-white shadow border rounded w-full  leading-tight focus:outline-none focus:shadow-outline pl-4 pr-4 "
                value={existencia}
                ref={existenciaRef}
                onChange={() => actualizarDisponibilidad()}
              >
                <option value="true">Apto</option>
                <option className=" text-red-500" value="false">
                  No Apto/Indisciplina
                </option>
              </select>
            </div>
          )}
        </section>
        <footer className=" leading-none p-2 md:p-4">
          <div className="flex items-center justify-between w-full"></div>
          <a
            className="flex items-center no-underline hover:underline text-black"
            href={seguromedico}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="green"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            <p className="ml-2 text-sm">Seguro Médico</p>
            {fechafinSeguroMedico > 0 ? (
              <p className="ml-2 text-sm w-full text-right">
                {fechafinSeguroMedico}
                días
              </p>
            ) : (
              <p className="ml-2 text-sm w-full text-red-500 text-right">
                {fechafinSeguroMedico}
                días
              </p>
            )}
          </a>

          <a
            className="flex items-center no-underline hover:underline text-black"
            href={sctr}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="green"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              ></path>
            </svg>
            <p className="ml-2 text-sm">SCTR</p>
            {fechafinSCTR > 0 ? (
              <p className="ml-2 text-sm w-full text-right">
                {fechafinSCTR} días
              </p>
            ) : (
              <p className="ml-2 text-sm w-full text-red-500 text-right">
                {fechafinSCTR}
                días
              </p>
            )}
          </a>
        </footer>
      </article>
    </div>
  );
};

export default Personal;

import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FirebaseContext } from "../../firebase";
import { useNavigate } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";
import Sidebar from "../ui/Sidebar";
const NuevoPersonal = () => {
  // state para las imagenes
  const [subiendo, guardarSubiendo] = useState(false);
  const [progreso, guardarProgreso] = useState(0);
  const [urlimagen, guardarUrlimagen] = useState("");

  const [subiendoSeguroMedico, guardarSubiendoSeguroMedico] = useState(false);
  const [progresoSeguroMedico, guardarProgresoSeguroMedico] = useState(0);
  const [urlPdfSeguroMedico, guardarUrlpdfSeguroMedico] = useState("");

  const [subiendoSCTR, guardarSubiendoSCTR] = useState(false);
  const [progresoSCTR, guardarProgresoSCTR] = useState(0);
  const [urlPdfSCTR, guardarUrlpdfSCTR] = useState("");

  // Context con las operaciones de firebase
  const { firebase } = useContext(FirebaseContext);

  // console.log(firebase);

  // Hook para redireccionar
  const navigate = useNavigate();

  // validación y leer los datos del formulario
  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      especialidad: "",
      centromedico: "",
      fechavigenciaSeguroMedico: "",
      fechaculminacionSeguroMedico: "",
      fechavigenciaSeguroSCTR: "",
      fechaculminacionSeguroSCTR: "",
      imagen: "",
      seguromedico: "",
      sctr: "",
      descripcion: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string()
        .min(3, "El nombre debe tener al menos 3 caracteres")
        .required("El Nombre es obligatorio"),
      apellido: Yup.string()
        .min(3, "El apellido debe tener al menos 3 caracteres")
        .required("El Apellido es obligatorio"),
      especialidad: Yup.string().required("La especialidad es obligatoria"),
      centromedico: Yup.string().required("El Centro médico es obligatoria"),
      fechavigenciaSeguroMedico: Yup.string().required(
        "La fecha inicio del Seguro Medico es obligatoria"
      ),
      fechaculminacionSeguroMedico: Yup.string().required(
        "La fecha fin del Seguro Medico es obligatoria"
      ),
      fechavigenciaSeguroSCTR: Yup.string().required(
        "La fecha fin del Seguro SCTR es obligatoria"
      ),
      fechaculminacionSeguroSCTR: Yup.string().required(
        "La fecha fin del Seguro SCTR es obligatoria"
      ),

      descripcion: Yup.string()
        .min(1, "La descripción debe ser más larga")
        .required("La descripción es obligatoria"),
    }),
    onSubmit: (personal) => {
      try {
        personal.existencia = true;
        personal.imagen = urlimagen;
        personal.seguromedico = urlPdfSeguroMedico;
        personal.sctr = urlPdfSCTR;
        firebase.db.collection("personal").add(personal);

        // Redireccionar
        navigate("/personal");
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Todo sobre las imagenes
  const handleUploadStart = () => {
    guardarProgreso(0);
    guardarSubiendo(true);
  };
  const handleUploadError = (error) => {
    guardarSubiendo(false);
    console.log(error);
  };
  const handleUploadSuccess = async (nombre) => {
    guardarProgreso(100);
    guardarSubiendo(false);

    // Almacenar la URL de destino
    const url = await firebase.storage
      .ref("personal")
      .child(nombre)
      .getDownloadURL();

    console.log(url);
    guardarUrlimagen(url);
  };
  const handleProgress = (progreso) => {
    guardarProgreso(progreso);

    console.log(progreso);
  };

  const handleUploadStartSeguroMedico = () => {
    guardarProgresoSeguroMedico(0);
    guardarSubiendoSeguroMedico(true);
  };
  const handleUploadErrorSeguroMedico = (error) => {
    guardarSubiendoSeguroMedico(false);
    console.log(error);
  };
  const handleUploadSuccessSeguroMedico = async (nombre) => {
    guardarProgresoSeguroMedico(100);
    guardarSubiendoSeguroMedico(false);

    // Almacenar la URL de destino
    const url = await firebase.storage
      .ref("seguromedico")
      .child(nombre)
      .getDownloadURL();

    console.log(url);
    guardarUrlpdfSeguroMedico(url);
  };
  const handleProgressSeguroMedico = (progresoSeguroMedico) => {
    guardarProgresoSeguroMedico(progresoSeguroMedico);

    console.log(progresoSeguroMedico);
  };

  const handleUploadStartSCTR = () => {
    guardarProgresoSCTR(0);
    guardarSubiendoSCTR(true);
  };
  const handleUploadErrorSCTR = (error) => {
    guardarSubiendoSCTR(false);
    console.log(error);
  };
  const handleUploadSuccessSCTR = async (nombre) => {
    guardarProgresoSCTR(100);
    guardarSubiendoSCTR(false);

    // Almacenar la URL de destino
    const url = await firebase.storage
      .ref("sctr")
      .child(nombre)
      .getDownloadURL();

    console.log(url);
    guardarUrlpdfSCTR(url);
  };
  const handleProgressSCTR = (progresoSCTR) => {
    guardarProgresoSCTR(progresoSCTR);

    console.log(progresoSCTR);
  };

  return (
    <>
      <div className="md:flex min-h-screen w-full">
        <Sidebar />

        <div className="flex justify-center mt-10 w-full">
          <div className="w-full max-w-3xl">
            <form onSubmit={formik.handleSubmit}>
              <h1 className="text-3xl font-light text-lg font-bold mb-4">
                Nuevo Personal
              </h1>
              <u className="text-gray-700 text-lg font-bold mb-2">
                Datos personales:{" "}
              </u>
              <div className=" flex ">
                <div className="w-1/2 mb-4">
                  <label
                    className="text-gray-700 text-sm font-bold mb-2"
                    htmlFor="nombre"
                  >
                    Nombre
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nombre"
                    type="text"
                    placeholder="Nombre"
                    value={formik.values.nombre}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className=" w-1/2 mb-4 ml-2">
                  <label
                    className=" text-gray-700 text-sm font-bold mb-2"
                    htmlFor="apellido"
                  >
                    Apellido
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="apellido"
                    type="text"
                    placeholder="Apellido"
                    value={formik.values.apellido}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2 mb-4">
                  {formik.touched.nombre && formik.errors.nombre ? (
                    <div
                      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                      role="alert"
                    >
                      <p className="font-bold">Hubo un error:</p>
                      <p>{formik.errors.nombre} </p>
                    </div>
                  ) : null}
                </div>

                <div className="w-1/2 mb-4 ml-2">
                  {formik.touched.apellido && formik.errors.apellido ? (
                    <div
                      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                      role="alert"
                    >
                      <p className="font-bold">Hubo un error:</p>
                      <p>{formik.errors.apellido} </p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="flex mb-4">
                <div className=" w-1/2 mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="imagen"
                  >
                    Foto
                  </label>
                  <FileUploader
                    accept="image/*"
                    id="imagen"
                    name="imagen"
                    randomizeFilename
                    storageRef={firebase.storage.ref("personal")}
                    onUploadStart={handleUploadStart}
                    onUploadError={handleUploadError}
                    onUploadSuccess={handleUploadSuccess}
                    onProgress={handleProgress}
                  />
                </div>

                <div className=" w-1/2 mb-4 ml-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="especialidad"
                  >
                    Especialidad
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="especialidad"
                    name="especialidad"
                    value={formik.values.especialidad}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">-- Seleccione --</option>
                    <option value="Arquitecto">Arquitecto</option>
                    <option value="Albañil">Albañil</option>
                    <option value="Electricista">Electricista</option>
                    <option value="Soldador">Soldador</option>
                    <option value="Topografo">Topografo</option>
                    <option value="Obrero">Obrero</option>
                  </select>
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2 mb-4">
                  {subiendo && (
                    <div className="h-12 relative w-full border">
                      <div
                        className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                        style={{ width: `${progreso}%` }}
                      >
                        {progreso} %
                      </div>
                    </div>
                  )}

                  {urlimagen && (
                    <p className="bg-green-500 text-white p-3 text-center my-5">
                      La imagen se subió correctamente
                    </p>
                  )}
                </div>
                <div className="w-1/2 mb-4 ml-2">
                  {formik.touched.especialidad && formik.errors.especialidad ? (
                    <div
                      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                      role="alert"
                    >
                      <p className="font-bold">Hubo un error:</p>
                      <p>{formik.errors.especialidad} </p>
                    </div>
                  ) : null}
                </div>
              </div>

              <u className="text-gray-700 text-lg font-bold mb-2">
                Vigencia del Seguro Médico:
              </u>

              <div className="flex">
                <div className=" w-1/2 mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="centromedico"
                  >
                    Centro Médico
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="centromedico"
                    name="centromedico"
                    value={formik.values.centromedico}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">-- Seleccione --</option>
                    <option value="Natclar">Natclar</option>
                  </select>
                </div>
                <div className=" w-1/2 mb-4 ml-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="seguromedico"
                  >
                    Seguros Médicos
                  </label>
                  <FileUploader
                    accept="pdf/*"
                    id="seguromedico"
                    name="seguromedico"
                    randomizeFilename
                    storageRef={firebase.storage.ref("seguromedico")}
                    onUploadStart={handleUploadStartSeguroMedico}
                    onUploadError={handleUploadErrorSeguroMedico}
                    onUploadSuccess={handleUploadSuccessSeguroMedico}
                    onProgress={handleProgressSeguroMedico}
                  />
                </div>
              </div>

              {subiendoSeguroMedico && (
                <div className="h-12 relative w-full border">
                  <div
                    className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                    style={{ width: `${progresoSeguroMedico}%` }}
                  >
                    {progresoSeguroMedico} %
                  </div>
                </div>
              )}

              {urlPdfSeguroMedico && (
                <p className="bg-green-500 text-white p-3 text-center my-5">
                  El pdf se subió correctamente
                </p>
              )}

              <div className="flex  mb-4">
                <div className="w-1/2 mb-4 mr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fechavigenciaSeguroMedico"
                  >
                    Fecha de Inicio del Seguro Médico:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fechavigenciaSeguroMedico"
                    type="date"
                    value={formik.values.fechavigenciaSeguroMedico}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="w-1/2 mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fechaculminacionSeguroMedico"
                  >
                    Fecha de Culminación del Seguro Médico:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fechaculminacionSeguroMedico"
                    type="date"
                    value={formik.values.fechaculminacionSeguroMedico}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2 mb-4">
                  {formik.touched.fechavigenciaSeguroMedico &&
                  formik.errors.fechavigenciaSeguroMedico ? (
                    <div
                      className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                      role="alert"
                    >
                      <p className="font-bold">Hubo un error:</p>
                      <p>{formik.errors.fechavigenciaSeguroMedico} </p>
                    </div>
                  ) : null}
                </div>
                <div className="w-1/2 mb-4 ml-2">
                  {formik.touched.fechaculminacionSeguroMedico &&
                  formik.errors.fechaculminacionSeguroMedico ? (
                    <div
                      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                      role="alert"
                    >
                      <p className="font-bold">Hubo un error:</p>
                      <p>{formik.errors.fechaculminacionSeguroMedico} </p>
                    </div>
                  ) : null}
                </div>
              </div>

              <u className="text-gray-700 text-lg font-bold mb-2">
                Seguro Complementario de Trabajo de Riesgo:
              </u>

              <div className="flex">
                <div className=" w-1/2 mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="segurossctr"
                  >
                    Centros Autorizados
                  </label>
                  <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="segurossctr"
                    name="segurossctr"
                    value={formik.values.segurossctr}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="">-- Seleccione --</option>
                    <option value="Rimac">Rimac</option>
                    <option value="Positiva">La positiva</option>
                    <option value="Pacifico">Pacifico</option>
                  </select>
                </div>
                <div className="w-1/2 mb-4 ml-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="sctr"
                  >
                    Seguros SCTR
                  </label>
                  <FileUploader
                    accept="pdf/*"
                    id="sctr"
                    name="sctr"
                    randomizeFilename
                    storageRef={firebase.storage.ref("sctr")}
                    onUploadStart={handleUploadStartSCTR}
                    onUploadError={handleUploadErrorSCTR}
                    onUploadSuccess={handleUploadSuccessSCTR}
                    onProgress={handleProgressSCTR}
                  />
                </div>
              </div>

              {subiendoSCTR && (
                <div className="h-12 relative w-full border">
                  <div
                    className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center"
                    style={{ width: `${progresoSCTR}%` }}
                  >
                    {progresoSCTR} %
                  </div>
                </div>
              )}

              {urlPdfSCTR && (
                <p className="bg-green-500 text-white p-3 text-center my-5">
                  El pdf se subió correctamente
                </p>
              )}

              <div className="flex  mb-4">
                <div className="w-1/2 mb-4 mr-2">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fechavigenciaSeguroSCTR"
                  >
                    Fecha de Inicio del Seguro SCTR:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fechavigenciaSeguroSCTR"
                    type="date"
                    value={formik.values.fechavigenciaSeguroSCTR}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                <div className="w-1/2 mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="fechaculminacionSeguroSCTR"
                  >
                    Fecha de Culminación del Seguro SCTR:
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="fechaculminacionSeguroSCTR"
                    type="date"
                    value={formik.values.fechaculminacionSeguroSCTR}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2 mb-4 ">
                  {formik.touched.fechavigenciaSeguroSCTR &&
                  formik.errors.fechavigenciaSeguroSCTR ? (
                    <div
                      className=" bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                      role="alert"
                    >
                      <p className="font-bold">Hubo un error:</p>
                      <p>{formik.errors.fechavigenciaSeguroMedico} </p>
                    </div>
                  ) : null}
                </div>
                <div className="w-1/2 mb-4 mr-2">
                  {formik.touched.fechaculminacionSeguroSCTR &&
                  formik.errors.fechaculminacionSeguroSCTR ? (
                    <div
                      className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                      role="alert"
                    >
                      <p className="font-bold">Hubo un error:</p>
                      <p>{formik.errors.fechaculminacionSeguroSCTR} </p>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="descripcion"
                >
                  Funciones
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                  id="descripcion"
                  placeholder="Función del empleador"
                  value={formik.values.descripcion}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                ></textarea>
              </div>

              {formik.touched.descripcion && formik.errors.descripcion ? (
                <div
                  className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"
                  role="alert"
                >
                  <p className="font-bold">Hubo un error:</p>
                  <p>{formik.errors.descripcion} </p>
                </div>
              ) : null}

              <input
                type="submit"
                className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                value="Agregar Personal"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NuevoPersonal;

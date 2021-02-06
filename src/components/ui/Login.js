import React from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignUp,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    user,
  } = props;

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto transition delay-150 duration-300 ease-in-out">
        <div className="absolute bg-blue-400 inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-4xl md:text-lg text-center">
              Bienvenidos a Seingel Perú
            </h1>
            <div className="flex flew-wrap"></div>
            <img
              className="w-full h-2.5"
              src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fGJ1aWxkaW5nfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            />
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="flex">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    ></path>
                  </svg>
                  <p>Usuario:</p>
                </div>
                <input
                  className="border-4 border-light-blue-500 border-opacity-50 w-full"
                  type="text"
                  autoFocus
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <p className="errorMsg">{emailError}</p>
                <div className="flex">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                  <label>Password</label>
                </div>
                <input
                  className="border-4 border-light-blue-500 border-opacity-50 w-full"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="errorMsg">{passwordError}</p>

                <div className="btnContainer">
                  {hasAccount ? (
                    <>
                      <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7 ">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4 w-full"
                          onClick={handleSignUp}
                        >
                          Registrarse
                        </button>
                        <p>
                          Tienes una cuenta ?{" "}
                          <span
                            onClick={() =>
                              setHasAccount && setHasAccount(!hasAccount)
                            }
                          >
                            Ingresar
                          </span>
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="pt-6 text-base leading-6 font-bold sm:text-lg sm:leading-7">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mb-4 w-full"
                          onClick={handleLogin}
                        >
                          Iniciar Sesión
                        </button>
                        <div className="flex">
                          <p>Tu no tienes una cuenta ? </p>
                          <span
                            className="underline ml-4"
                            onClick={() =>
                              setHasAccount && setHasAccount(!hasAccount)
                            }
                          >
                            Crear Cuenta
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

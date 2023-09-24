import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../assets/img/logo.jpg";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submit(e) {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/Signup", {
        email,
        password,
      });

      if (response.data === "exist") {
        alert("User Already exists");
      } else if (response.data === "not exist") {
        // Redirect to /header with email state
        window.location.href = `/header?id=${email}`;
      }
    } catch (error) {
      alert("Wrong Details");
      console.error(error);
    }
  }

  return (
    <div className="flex w-full h-[100vh] max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage:
            'url("https://image.lexica.art/full_jpg/5cb04f30-ed43-4fe6-b65a-c6ec007a1579")',
        }}
      ></div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2 justify-center items-center flex flex-col">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-16 sca rounded-3xl " src={img} alt="" />
        </div>

        <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
          Welcome back!
        </p>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

          <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
        </div>

        <form onSubmit={submit}>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="LoggingEmailAddress"
            >
              Email Address
            </label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              id="LoggingEmailAddress"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="email"
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="loggingPassword"
              >
                Password
              </label>
            </div>

            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Password"
              id="loggingPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
              type="password"
            />
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-700 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
            >
              Submit
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4 w-[100%]">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

          <Link
            to="/"
            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            or sign up
          </Link>

          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
};

export default Signup;

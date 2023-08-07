"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [InputValue, setInputValue] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [data, setdata] = useState("");

  const handleSubmit = (e) => {
    setisLoading(true);
    e.preventDefault();
    axios
      .post("http://localhost:8080/shayari", { message: InputValue })
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setisLoading(false);
      });
    setInputValue("");
  };

  return (
    <>
      <main className="bg-500 bg-[#252B48] font-mono">
        <center>
          <h1 className="pt-5 text-sky-50 text-4xl  font-bold">
            Shayari Application
          </h1>
        </center>
        <div className="flex p-5 items-center min-h-[95vh]">
          <div className="flex-1 ">
            <form onSubmit={handleSubmit}>
              <center>
                <div className="mb-6">
                  <label
                    htmlFor="default-input"
                    className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">
                    Type your Shayari Title
                  </label>
                  <input
                    onChange={(e) => setInputValue(e.target.value)}
                    type="text"
                    value={InputValue}
                    id="default-input"
                    placeholder="......"
                    className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[60%] p-2.5 bg-[#252B48] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <input
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                />
              </center>
            </form>
          </div>
          <div className="flex-1 ">
            {isLoading ? (
              <>
                <h1 className="text-sky-500 ">Loading...</h1>
              </>
            ) : (
              <>
                <h1 className="text-sky-500">{data}</h1>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

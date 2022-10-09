import React, { useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";

const fr_cl = (fr) => {
  return (((fr - 32) * 5) / 9).toFixed(0);
};
const flu = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [input, setInput] = useState("");
  const getCountry = () => {
    let cData = fetch("https://ipinfo.io/json?token=4f66e17bb00ee4");
    return cData;
  };

  useEffect(() => {
    getCountry()
      .then((res) => res.json())
      .then((data) => {
        return data.city;
      })
      .then((city) => {
        fetch(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
            input === "" ? city : input
          }?key=GK5PKAP745HMQ8YVZXWDWB62L`
        )
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setTimeout(() => {
              setIsloading(false);
            }, 800);
          });
      });
  }, [input]);

  if (isLoading) {
    return (
      <>
        <div className="main_container w-full min-h-screen flex justify-center items-center">
          <div role="status">
            <svg
              class="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </>
    );
  }

  if (isLoading === false) {
    return (
      <>
        <div className="main_container lg:max-w-[50%] pb-7 lg:mx-auto flex flex-col justify-between">
          <div className="blue_section mb-7 min-h-[67vh] bg-blue-600 shadow-lg shadow-gray-400 flex flex-col justify-center space-y-10 text-center py-5 rounded-b-[50px]">
            <div className="search_bar">
              <form className="flex items-center mx-10">
                <label htmlFor="simple-search" className="sr-only">
                  Search any area or country
                </label>
                <div className="relative w-full">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="simple-search"
                    className="border bg-white border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  "
                    placeholder="Search"
                    onChange={(e) => {
                      setInput(e.target.value);
                      console.log(input);
                    }}
                    value={input}
                  />
                </div>
              </form>
            </div>
            <div className="country">
              <h1 className="text-xl font-bold text-white">
                {data.resolvedAddress}
              </h1>
            </div>
            <div className="temp">
              <h1 className="text-9xl font-extrabold text-white">
                {fr_cl(data.days[0].temp)}°
              </h1>
            </div>
            <div className="time">
              <h1 className="text-xl font-extrabold text-white">
                {data.days[0].datetime}
              </h1>
            </div>
            <div className="quality">
              <h1 className="text-2xl font-extrabold text-white">
                {data.days[0].conditions}
              </h1>
            </div>
          </div>

          <div className="yellow_section shadow-lg shadow-gray-400 bg-amber-400 mx-3 rounded-2xl">
            <div className="temps flex justify-evenly text-center pt-7">
              <div className="min_temps flex flex-col">
                <span className="text-xl font-extrabold text-white">
                  Min Temp
                </span>
                <span className="text-xl font-extrabold text-white">
                  {fr_cl(data.days[0].tempmin)}°
                </span>
              </div>
              <div className="max_temps flex flex-col">
                <span className="text-xl font-extrabold text-white">
                  Max Temp
                </span>
                <span className="text-xl font-extrabold text-white">
                  {fr_cl(data.days[0].tempmax)}°
                </span>
              </div>
              <div className="humidity flex flex-col">
                <span className="text-xl font-extrabold text-white">
                  Humidity
                </span>
                <span className="text-xl font-extrabold text-white">
                  {data.days[0].humidity}%
                </span>
              </div>
            </div>
            <hr className="border border-spacing-3 my-1" />
            <div className="credit text-end pb-1 pr-7">
              <span className="text-[10px] text-white font-extrabold">
                MADE WITH ❤️ BY SIAM
              </span>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Home;

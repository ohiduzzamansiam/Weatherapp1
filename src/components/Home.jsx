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
  const [country, setCountry] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    const getCountry = async () => {
      let res = await axios.get("https://ipinfo.io/json?token=4f66e17bb00ee4");
      let data = await res.data;
      setCountry(data.city);
    };
    getCountry();
  }, []);
  useEffect(() => {
    if (country.length) {
      const getTemp = async () => {
        let res = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${
            input === "" ? country : input
          }?key=GK5PKAP745HMQ8YVZXWDWB62L`
        );
        let data = await res.data;
        setData(data);
        setIsloading(false);
      };
      getTemp();
    }
  }, [country, input]);

  if (isLoading === false) {
    return (
      <>
        <div className="main_container lg:max-w-[50%] pb-7 lg:mx-auto min-h-screen max-h-screen flex flex-col justify-between">
          <div className="blue_section min-h-[73vh] bg-blue-600 shadow-lg shadow-gray-400 flex flex-col justify-center space-y-10 text-center py-5 rounded-b-[50px]">
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

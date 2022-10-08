import React, { useEffect, useState } from "react";
import sky from "../assets/sky.png";
import "./Home.css";

const fr_cl = (fr) => {
  return (((fr - 32) * 5) / 9).toFixed(0);
};
const flu = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  useEffect(() => {
    const getData = async () => {
      await fetch(
        "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/bangladesh?key=GK5PKAP745HMQ8YVZXWDWB62L"
      )
        .then((res) => res.json())
        .then((temps) => {
          setData(temps);
          setIsloading(false);
        });
    };
    getData();
    console.log(data);
  }, []);

  if (isLoading === false) {
    return (
      <>
        <div className="main_container">
          <div className="blue_section min-h-[70vh] bg-blue-600 shadow-lg shadow-gray-400 flex flex-col justify-center space-y-10 text-center py-5 rounded-b-[50px]">
            <div className="country">
              <h1 className="text-3xl font-bold text-white">
                {flu(data.address)}
              </h1>
            </div>
            <div className="temp">
              <h1 className="text-9xl font-extrabold text-white">
                {fr_cl(data.days[0].temp)}°
              </h1>
            </div>
            <div className="quality">
              <h1 className="text-2xl font-extrabold text-white">
                {data.days[0].conditions}
              </h1>
            </div>
          </div>

          <div className="yellow_section bg-amber-400 mx-3 mt-10 rounded-2xl">
            <div className="temps flex justify-evenly text-center py-7">
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
          </div>
        </div>
      </>
    );
  }
};

export default Home;

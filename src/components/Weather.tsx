import React from 'react';
import WeatherCard from './WeatherCard';

const Weather = () => {
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 pt-10 pb-5 mx-auto">
        <div className="flex flex-wrap w-full flex-col items-center text-center">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
            Weather App - NodeJs, ReactJs, Typescript{' '}
          </h1>
          <h2 className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            A responsive weather forecasting application built with Node.js, React, and TypeScript.
            This app allows users to search for real-time weather data of any city worldwide, using
            a clean and modern UI.
          </h2>
          <WeatherCard />
        </div>
      </div>
    </section>
  );
};

export default Weather;

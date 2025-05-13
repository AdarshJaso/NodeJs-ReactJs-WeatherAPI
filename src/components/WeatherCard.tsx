import React, { useCallback, useEffect, useState } from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { WiStrongWind, WiHumidity } from 'react-icons/wi';
import { useSearchParams } from 'react-router';
import { WeatherCardTypes } from '../types/weatherCard';
import WeatherInput from './WeatherInput';

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState<WeatherCardTypes | null>(null);
  const [input, setInput] = useState<string>('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const fetchWeatherData = useCallback(async (val: string = 'brisbane') => {
    try {
      const res = await fetch(`http://localhost:8000/api/weather-data?city=${val}`);
      if (!res.ok) throw new Error('Weather data not found');
      const data = await res.json();
      setIsLoading(false);
      setWeatherData(data);
    } catch (err) {
      console.error('Error fetching weather:', err);
      setWeatherData(null);
    }
  }, []);

  useEffect(() => {
    const query = searchParams.get('query');
    if (query) {
      fetchWeatherData(query);
    } else {
      fetchWeatherData();
    }
  }, [fetchWeatherData, searchParams]);

  const handleSearch = () => {
    if (!input.trim()) {
      return;
    }
    setSearchParams({ query: input.trim() });
    setIsLoading(true);
    fetchWeatherData(input);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const handleReset = () => {
    setInput('');
    setSearchParams();
    fetchWeatherData();
  };

  return (
    <div className="w-full sm:w-2/3 lg:w-1/2 xl:w-1/3 p-4">
      <div className="border border-gray-200 p-6 rounded-lg gap-4 flex flex-col shadow-stone-200 shadow-lg bg-linear-to-r from-cyan-500 to-blue-500 min-h-90">
        <div className="flex items-center">
          <WeatherInput
            val={input}
            eventHandler={handleInput}
            handleKeyDown={handleKeyDown}
            reset={handleReset}
          />
          <button
            type="button"
            className="flex ms-3 p-2 text-white border-1 rounded-full cursor-pointer shadow-lg"
            onClick={handleSearch}
          >
            <FaMagnifyingGlass size="15px" />
          </button>
        </div>
        {!isLoading ? (
          <>
            <div className="flex items-center justify-center flex-col text-white">
              <div className="w-25 h-25 inline-flex items-center justify-center text-white">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0]?.icon}@2x.png`}
                  alt={weatherData?.weather?.[0]?.description}
                  title={weatherData?.weather?.[0]?.description}
                />
              </div>
              <div className="text-[30px] font-extrabold mb-2">
                {weatherData?.main?.temp ? Math.ceil(weatherData?.main?.temp - 273.15) : null}&deg;C
              </div>
              <div className="text-base font-medium mb-4">{`${weatherData?.name}, ${weatherData?.sys?.country}`}</div>
            </div>
            <div className="flex w-full text-white">
              <div className="w-1/2 flex items-center">
                <WiHumidity size="40px" title="Windy" className="basis-1/3" />
                <div className="basis-2/3 text-start ms-1 text-sm">
                  <div>{weatherData?.main?.humidity}%</div>
                  <div>Humidity</div>
                </div>
              </div>
              <div className="w-1/2 flex items-center">
                <WiStrongWind size="40px" title="Windy" className="basis-1/3" />
                <div className="basis-2/3 text-start ms-1 text-sm">
                  <div>{weatherData?.wind?.speed} m/s</div>
                  <div>Wind speed</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-60 animate-spin">
            <AiOutlineLoading3Quarters className="text-white" size={30} />
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;

import React from 'react';
import { FaXmark } from 'react-icons/fa6';

interface WeatherInputProps {
  val: string;
  eventHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  reset: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const WeatherInput: React.FC<WeatherInputProps> = ({ val, eventHandler, handleKeyDown, reset }) => {
  return (
    <div className="relative w-full">
      <input
        type="text"
        placeholder="Enter weather location"
        className="text-white border-1 border-white focus-visible:outline-0 focus:border-white-500 rounded-sm py-2 ps-2 pe-9 w-full shadow-lg"
        name="weatherInput"
        id="weatherInput"
        value={val}
        onChange={eventHandler}
        onKeyDown={handleKeyDown}
      />
      {val ? (
        <button type="submit" className="cursor-pointer" onClick={reset}>
          <FaXmark size="15px" color="white" className="absolute right-3 bottom-3.5" />
        </button>
      ) : null}
    </div>
  );
};

export default WeatherInput;

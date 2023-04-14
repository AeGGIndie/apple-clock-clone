// reference: https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
import react from "react";
import { useEffect, useState } from "react";
import { useBoundStore } from "../../stores/useBoundStore";


const Timer = () => {
  const time = useBoundStore(state => state.time);
  const resetTime = useBoundStore(state => state.resetTime);
  const stopTimer = useBoundStore(state => state.stopTimer);

  const { hours, minutes, seconds } = time;
  const hourString = hours < 10 ? `0${hours}` : `${hours}`
  const minuteString = minutes < 10 ? `0${minutes}` : `${minutes}`
  const secondString = seconds < 10 ? `0${seconds}` : `${seconds}`

  useEffect(() => {
    const { hours, minutes, seconds } = time;
    if (hours === 0 && minutes === 0 && seconds === 0){
      stopTimer();
    }
    console.log("time - ", time);
  }, [time]);

  return (
    <div className="flex flex-auto items-stretch justify-center bg-blue-600">
      <div className="relative h-[300px] w-[300px] m-auto">
        <svg id="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g id="base-timer__circle" className="fill-none stroke-none">
            <circle id="base-timer__path-elapsed" className="stroke-[7px] stroke-gray-500" cx="50" cy="50" r="45" />
          </g>
        </svg>
        <span id="base-timer-label" className="absolute w-[300px] h-[300px] top-0 flex items-center justify-center text-5xl">
          { hours > 0 ? `${hourString}:${minuteString}:${secondString}` : `${minuteString}:${secondString}`}
        </span>
      </div>
    </div>
  )
}

export const timeInSeconds = (time) => {
  if (!time) throw new Error("time object was found null/undefined"); 
  const { hours, minutes, seconds } = time;
  return (seconds + (minutes * 60) + (hours * 60 * 60));
}

export default Timer;
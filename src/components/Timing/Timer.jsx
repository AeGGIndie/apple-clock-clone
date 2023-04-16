// reference: https://css-tricks.com/how-to-create-an-animated-countdown-timer-with-html-css-and-javascript/
import { useEffect, useState, useRef } from "react";
import { useBoundStore } from "../../stores/useBoundStore";

const Timer = ({ setIsTiming }) => {
  const [audio, setAudio] = useState(null);

  const time = useBoundStore(state => state.time);
  const limit = useBoundStore(state => state.limit);
  const stopTimer = useBoundStore(state => state.stopTimer);

  const stopModalRef = useRef(null);

  const { hours, minutes, seconds } = time;
  const hourString = hours < 10 ? `0${hours}` : `${hours}`
  const minuteString = minutes < 10 ? `0${minutes}` : `${minutes}`
  const secondString = seconds < 10 ? `0${seconds}` : `${seconds}`

  useEffect(() => {
    setAudio(new Audio("clock-alarm.mp3"));
  }, []);

  useEffect(() => {
    const { hours, minutes, seconds } = time;
    if (hours === 0 && minutes === 0 && seconds === 0){
      // stop the timer
      stopTimer();

      // prompt the user to stop alert
      const stopModal = stopModalRef.current;
      stopModal.showModal();

      // send notification for timer finished
      new Notification("Your timer is ringing!");

      // play sound for alert until user clicks stop
      audio.play();
    }
  }, [time]);

  const dashArray = () => {
    const timeFraction = timeInSeconds(time) / timeInSeconds(limit);
    return (timeFraction - (1 / timeInSeconds(limit)) * (1 - timeFraction));
  }

  const closeModalHandler = () => {
    const stopModal = stopModalRef.current;
    stopModal.close();
    audio.pause();
    setIsTiming(false);
  }

  // TODO: when timer is done
  // pop-up a modal asking to stop the timer and redirect to the selection component
  const isTiming = hours === 0 && minutes === 0 && seconds === 0 ? false : true;

  return (
    <div className="flex flex-auto items-stretch justify-center ">
      <div className="relative flex justify-center h-[300px] w-[300px] md:h-[400px] md:w-[400px] m-auto">
        <svg id="base-timer__svg" className="scale-x-[-1]" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <g id="base-timer__circle" className="fill-none stroke-none">
            <circle id="base-timer__path-elapsed" className="stroke-[4px] stroke-slate-700" cx="50" cy="50" r="45" />
            <path
              id="base-timer-path-remaining"
              strokeDasharray={`${(dashArray() * 283).toFixed(0)} 283`}
              strokeLinecap="round"
              className={`${ isTiming ? "stroke-orange-400" : "" } stroke-[4px] rotate-90 origin-center`}
              d="
                M 50, 50
                m -45, 0
                a 45,45 0 1,0 90,0
                a 45,45 0 1,0 -90,0
              "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" className="text-neutral-300 absolute w-[300px] h-[300px] top-[-10px] md:top-10 flex items-center justify-center text-6xl">
          { hours > 0 ? `${hourString}:${minuteString}:${secondString}` : `${minuteString}:${secondString}`}
        </span>
        <span id="base-timer-sublabel" className="text-neutral-600 absolute w-[300px] h-[300px] top-10 md:top-24 flex items-center justify-center text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mr-[1px] w-6 h-6">
            <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z" clipRule="evenodd" />
          </svg>
          {new Date(new Date().getTime() + timeInSeconds(time) * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
      <dialog open={undefined} ref={stopModalRef} id="stop-modal" className="text-white max-w-[500px] h-[100px] bg-transparent rounded-3xl">
        <h1 className="text-2xl text-center">Timer</h1>
        <button onClick={closeModalHandler} className="self-center bg-orange-400 w-28 h-10 rounded-3xl hover:bg-orange-500 active:bg-orange-600">
          Stop
        </button>
      </dialog>
    </div>
  )
}

export const timeInSeconds = (time) => {
  if (!time) throw new Error("time object was found null/undefined"); 
  const { hours, minutes, seconds } = time;
  return (seconds + (minutes * 60) + (hours * 60 * 60));
}

export default Timer;
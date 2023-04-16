import react from "react";
import { useBoundStore } from "../../stores/useBoundStore";

const StartButton = ({ isTiming, setIsTiming, retrieveTime }) => {
  const setTime = useBoundStore(state => state.setTime);
  const startTimer = useBoundStore(state => state.startTimer);
  const decreaseTime = useBoundStore(state => state.decreaseTime);
  const setTimeLimit = useBoundStore(state => state.setTimeLimit);

  const startHandler = () => {
    const { hours, minutes, seconds } = retrieveTime();
    if (hours === 0 && minutes === 0 && seconds === 0){
      return alert("Please choose how long you would like your timer to be");
    }
    console.log(`setting a timer for ${hours}h ${minutes}min ${seconds}sec`);
    setTime({ hours, minutes, seconds });
    setTimeLimit({ hours, minutes, seconds });
    startTimer(() => {
      decreaseTime();
    }, 1000);
    setIsTiming(!isTiming);
  }

  return (
    <button className="text-center text-green-400 w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-500/50 border-2 border-black outline outline-green-500/50 outline-2 clear-both" onClick={startHandler}>
      Start
    </button>
  )
}

export default StartButton;
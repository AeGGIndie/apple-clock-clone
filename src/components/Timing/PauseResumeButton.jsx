import react, { useState } from "react";
import { useBoundStore } from "../../stores/useBoundStore";

const PauseResumeButton = () => {
  const [isPaused, setPaused] = useState(false);
  
  const startTimer = useBoundStore(state => state.startTimer);
  const decreaseTime = useBoundStore(state => state.decreaseTime);
  const stopTimer = useBoundStore(state => state.stopTimer);
  
  const pauseHandler = () => {
    setPaused(true);
    stopTimer();
  }
  const resumeHandler = () => {
    setPaused(false);
    startTimer(() => {
      decreaseTime()
    }, 1000);
  }
  
  const pauseButtonStyles = `text-center text-orange-400 bg-orange-500/50 rounded-full w-16 md:w-20 h-16 md:h-20 border-2 border-black outline outline-orange-500/50 outline-2 clear-both`;
  const resumeButtonStyles = `text-center text-green-400 w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-500/50 border-2 border-black outline outline-green-500/50 outline-2 clear-both`;
  return (
    <>
    {
      !isPaused ?
      <button className={pauseButtonStyles} onClick={pauseHandler}>
        Pause
      </button> : 
      <button className={resumeButtonStyles} onClick={resumeHandler}>
        Resume
      </button>
    }
    </>
  )
}

export default PauseResumeButton;
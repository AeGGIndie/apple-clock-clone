import react from "react";
import { useBoundStore } from "../../stores/useBoundStore";

const CancelButton = ({ isTiming, setIsTiming }) => {
  const resetTime = useBoundStore(state => state.resetTime);
  const stopTimer = useBoundStore(state => state.stopTimer);
  const cancelHandler = () => {
    resetTime();
    stopTimer();
    setIsTiming(!isTiming);
  }
  const buttonStyles = `text-center ${isTiming ? "text-slate-300" : "text-slate-400"} bg-slate-600/50 rounded-full w-16 md:w-20 h-16 md:h-20 border-2 border-black outline outline-slate-600/50 outline-2 clear-both`

  return (
    <button className={buttonStyles} disabled={!isTiming} onClick={cancelHandler}>
      Cancel
    </button>
  )
}

export default CancelButton;
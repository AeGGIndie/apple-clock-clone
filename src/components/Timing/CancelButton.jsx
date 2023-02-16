import react from "react";

const CancelButton = ({ setTime, setIsTiming, isTiming }) => {

  const cancelHandler = () => {
    console.log('todo: cancel handler')
    setIsTiming(!isTiming);
  }
  const buttonStyles = `text-center ${isTiming ? "text-slate-300" : "text-slate-400"} bg-slate-600/50 rounded-full w-16 h-16 border-2 border-black outline outline-slate-600/50 outline-2 clear-both`

  return (
    <button className={buttonStyles} disabled={!isTiming} onClick={cancelHandler}>
      Cancel
    </button>
  )
}

export default CancelButton;
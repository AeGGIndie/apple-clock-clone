import react from "react";

const StartButton = ({ setTime, setIsTiming, isTiming }) => {

  const startHandler = () => {
    console.log('todo: start handler');
    setIsTiming(!isTiming)
  }

  return (
    <button className="text-center text-green-400 w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-500/50 border-2 border-black outline outline-green-500/50 outline-2 clear-both" onClick={startHandler}>
      Start
    </button>
  )
}

export default StartButton;
import { useState, useRef } from 'react';
import Scroller from './components/Scrolling/Scroller';
import CancelButton from './components/Timing/CancelButton';
import StartButton from './components/Timing/StartButton';
import Timer from './components/Timing/Timer';

function App() {
  const hourItems = [-1, ...Array.from(new Array(24), (x, i) => i ), -1];
  const minuteItems = [-1, ...Array.from(new Array(60), (x, i) => i ), -1];
  const secondItems = [-1, ...Array.from(new Array(60), (x, i) => i ), -1];
  const [isTiming, setIsTiming] = useState(false);

  const hoursElement = useRef(null);
  const minutesElement = useRef(null);
  const secondsElement = useRef(null);

  const retrieveTime = () => {
    const hours = hoursElement.current ? Number(hoursElement.current.innerHTML) : 0;
    const minutes = minutesElement.current ? Number(minutesElement.current.innerHTML) : 0;
    const seconds = secondsElement.current ? Number(secondsElement.current.innerHTML) : 0;
    return { hours, minutes, seconds };
  }

  return (
    <div className="App bg-black m-0 w-screen h-screen max-h-screen max-w-screen block">
      <div className='flex flex-col justify-center'>
        {/**
         * Area for Scroller and Timer
         */}
        
        <div className="flex flex-auto grow shrink w-[350px] h-[350px] justify-around min-w-full relative">
          {isTiming ? <Timer />
            : 
          <>
            <Scroller scrolledElem={hoursElement} items={hourItems} measurementText='hours' />
            <Scroller scrolledElem={minutesElement} items={minuteItems} measurementText='mins' />
            <Scroller scrolledElem={secondsElement} items={secondItems} measurementText='secs' />
          </>
          }
        </div>      
        {/**
         * Area for Start/Stop/Pause buttons
         */}
        <div className="static flex justify-around top-2/3 w-full h-14">
          <CancelButton 
            isTiming={isTiming} 
            setIsTiming={setIsTiming}
          />
          <StartButton 
            isTiming={isTiming} 
            setIsTiming={setIsTiming} 
            retrieveTime={retrieveTime}
          />
        </div>
       </div>
    </div>
  )
}

export default App;

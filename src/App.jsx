import { useState, useRef } from 'react';
import Scroller from './components/Scrolling/Scroller';
import CancelButton from './components/Timing/CancelButton';
import StartButton from './components/Timing/StartButton';
import Timer from './components/Timing/Timer';

function App() {
  const items = [-1,0,1,2,3,4,5,6,7,8,9,10,-1];

  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isTiming, setIsTiming] = useState(false);

  const hoursElement = useRef(null);
  const minutesElement = useRef(null);
  const secondsElement = useRef(null);

  return (
    <div className="App bg-black m-0 w-screen h-screen max-h-screen max-w-screen block">
      <div className='flex flex-col justify-center'>
        {/**
         * Area for Scroller and Timer
         */}
        
        <div className="flex flex-auto justify-around min-w-full relative">
          {isTiming ? <Timer />
            : 
          <>
            <Scroller scrolledElem={hoursElement} items={items} measurementText='hours' />
            <Scroller scrolledElem={minutesElement} items={items} measurementText='mins' />
            <Scroller scrolledElem={secondsElement} items={items} measurementText='secs' />
          </>
          }
        </div>      
        {/**
         * Area for Start/Stop/Pause buttons
         */}
        <div className="static flex justify-around top-2/3 w-full h-14">
          <CancelButton isTiming={isTiming} setIsTiming={setIsTiming} />
          <StartButton isTiming={isTiming} setIsTiming={setIsTiming} />
        </div>
       </div>
    </div>
  )
}

export default App

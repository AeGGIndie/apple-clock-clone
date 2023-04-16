import { useEffect } from 'react';
import { useState, useRef } from 'react';
import Scroller from './components/Scrolling/Scroller';
import CancelButton from './components/Timing/CancelButton';
import StartButton from './components/Timing/StartButton';
import Timer from './components/Timing/Timer';
import PauseResumeButton from './components/Timing/PauseResumeButton';

function App() {
  useEffect(() => {
    if (Notification.permission === "default"){
      Notification.requestPermission();
    }
  }, [Notification.permission]);

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
    <div className="App bg-neutral-900 m-0 w-screen h-screen max-h-screen max-w-screen block">
      <div className='flex flex-col justify-center h-full'>
        {/**
         * Area for Scroller and Timer
         */}
        
        <div className="flex flex-auto grow shrink w-[350px] h-[350px] justify-around min-w-full relative">
          {isTiming ? <Timer setIsTiming={setIsTiming} />
            : 
          <div className="w-full flex flex-row">
            <Scroller scrolledElem={hoursElement} items={hourItems} measurementText='hours' />
            <Scroller scrolledElem={minutesElement} items={minuteItems} measurementText='mins' />
            <Scroller scrolledElem={secondsElement} items={secondItems} measurementText='secs' />
            <div className="absolute basis-full flex-auto h-9 bg-slate-100 w-[82%] sm:w-[80%] translate-x-[15%] translate-y-[576%] rounded opacity-[15%] z-20"/>
          </div>
          }
        </div>      
        {/**
         * Area for Start/Stop/Pause buttons
         */}
        <div className="flex grow justify-around w-full h-[350px]">
          <CancelButton 
            isTiming={isTiming} 
            setIsTiming={setIsTiming}
          />
          {
          !isTiming ? 
          
          <StartButton 
            isTiming={isTiming} 
            setIsTiming={setIsTiming} 
            retrieveTime={retrieveTime}
          /> : <PauseResumeButton />
          }
        </div>
       </div>
    </div>
  )
}

export default App;

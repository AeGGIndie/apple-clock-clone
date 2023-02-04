import { useState } from 'react';
import Scroller from './components/Scroller';

function App() {
  const items = [-1,0,1,2,3,4,5,6,7,8,9,10,-1]

  return (
    <div className="App bg-slate-800 m-0 w-screen h-screen">
      <div className="flex justify-center min-w-fit">
        <Scroller items={items} />
        <Scroller items={items} />
        <Scroller items={items} />
      </div>
    </div>
  )
}

export default App

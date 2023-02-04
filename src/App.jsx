import { useState } from 'react';
import Scroller from './components/Scroller';

function App() {
  const items = [-1,0,1,2,3,4,5,6,7,8,9,10,-1]

  return (
    <div className="App bg-slate-800 w-screen h-screen flex justify-center font-mono">
        <Scroller items={items} />
    </div>
  )
}

export default App

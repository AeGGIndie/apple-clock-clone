import react, { useState } from "react";

const ScrollerItem = ({ active, item }) => {
  const classes = `h-14 align-middle text-center flex-auto justify-center border-slate-500  text-slate-400 my-2 snap-center`;
  return (
    <>
    {item === -1 ? <div className="h-14 flex flex-auto justify-center border-slate-500 bg-amber-400 my-2.5 invisible">{item}</div> 
    : 
    <div className={classes}>{item}</div>}
      
    </>
  )    
}

export default ScrollerItem;
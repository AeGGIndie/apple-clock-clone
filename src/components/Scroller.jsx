import react, { useEffect, useState, useRef } from "react";
import ScrollerItem from "./ScrollerItem"

const Scroller = ({ items }) => {
  const [move, setMove] = useState(false); // if scrolling is occurring
  const scrolledElement = useRef(null); // currently scrolled html element (within the selector)
  const scroller = useRef(null); // scroll container
  const scrollSelector = useRef(null); // scroll selector

  let position = { scrollTop: 0, y: 0 };

  // check each of the children against the selector
  const scrollHandler = () => Array.from(scroller.current.children).forEach((child, index) => {
    if (child !== scrollSelector.current && elementsOverlap(child.getBoundingClientRect(), scrollSelector.current.getBoundingClientRect())){
      scrolledElement.current = child;
      console.log(scrolledElement.current, " is overlapping");
      
    }
  });

  // function to check if two elements are overlapping
  // https://stackoverflow.com/questions/12066870/how-to-check-if-an-element-is-overlapping-other-elements
  const elementsOverlap = (smallElement, bigElement) => {
    return !(smallElement.right < bigElement.left || 
      smallElement.left > bigElement.right || 
      smallElement.bottom < bigElement.top || 
      smallElement.top > bigElement.bottom)
  }

  const mouseMoveHandler = (e) => {
    const distanceY = e.clientY - position.y;
    scroller.current.scrollTop = position.scrollTop - distanceY
  }

  const mouseUpHandler = (e) => {
    setMove(false);
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);

    scroller.current.classList.remove("cursor-grabbing");
    scroller.current.classList.add("cursor-grab");
    scroller.current.style.removeProperty("user-select");
  }

  const mouseDownHandler = (e) => {
    setMove(true);
    scroller.current.style.userSelect = "none";
    scroller.current.classList.add("cursor-grabbing");
    scroller.current.classList.remove("cursor-grab");

    position = {
      scrollTop: scroller.current.scrollTop,
      y: e.clientY,
    }

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  }

  return (
    <div ref={scroller} id="scroller" onScroll={scrollHandler} onMouseDown={mouseDownHandler} className="mt-40 mb-40 mr-8 ml-8 w-3/4 h-32 min-w-max bg-slate-300 rounded-3xl flex flex-col cursor-grab overflow-auto justify-between snap-y snap-mandatory scroll-smooth scroll-py-2 relative">
      <div ref={scrollSelector} id="selector" className="fixed z-10 m-auto flex-auto bg-slate-50 opacity-30 top-52 left-1/4 w-1/2 h-8 rounded-3xl"></div>
      {
        items.map((item, index) => {return <ScrollerItem item={item} key={index} active={move} />})
      }
    </div>
  )
}

export default Scroller;
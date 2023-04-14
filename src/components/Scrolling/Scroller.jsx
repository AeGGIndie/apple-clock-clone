import react, { useEffect, useState, useRef } from "react";
import ScrollerItem from "./ScrollerItem"

const Scroller = ({ items, scrolledElem, measurementText = "hours/mins/secs" }) => {
  const [move, setMove] = useState(false); // if scrolling is occurring
  // const scrolledElement = useRef(null); // currently scrolled html element (within the selector)
  const scroller = useRef(null); // scroll container
  const scrollSelector = useRef(null); // scroll selector
  let position = { scrollTop: 0, y: 0 };

  // each time the component is re-rendered
  // we want to reset it to what is currently being hovered
  useEffect(() => {
    scrollHandler();
  }, []);

  // check each of the children against the selector
  const scrollHandler = () => Array.from(scroller.current.children).forEach((child, index) => {
    if (child !== scrollSelector.current && elementsOverlap(child.getBoundingClientRect(), scrollSelector.current.getBoundingClientRect())){
      scrolledElem.current = child;
      // console.log(scrolledElem.current, " is overlapping");
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
    <div className="flex-auto flex items-start relative justify-center w-40 h-1/2">
      <div ref={scroller} onScroll={scrollHandler} onMouseDown={mouseDownHandler} className="scroller mt-40 mb-32 w-3/4 h-32 mx-8 bg-slate-300 rounded-3xl flex flex-col flex-auto cursor-grab overflow-auto justify-between snap-y snap-mandatory scroll-smooth relative basis-1/2">
        {
          items.map((item, index) => {return <ScrollerItem item={item} key={index} active={move} />})
        }
      </div>
      <div ref={scrollSelector} className="basis-1/2 flex-auto absolute selector z-10 bg-slate-50 opacity-30 w-2/3 h-8 translate-y-[650%] rounded-3xl text-right">
        <div className="fixed h-full translate-y-[8%] left-[55%] text-right mx-2 mt-1.5 text-xs ">{ measurementText }</div>
      </div>
    </div>
  )
}

export default Scroller;
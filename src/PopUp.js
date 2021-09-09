import React from 'react'
import { useEffect, useRef } from 'react'

const PopUp = ({newGame, restart}) => {
const inputRef = useRef(null)
const handleClick = e => {
  if (inputRef.current.contains(e.target)) {
    // inside click
    return;
  }

  restart()
  document.removeEventListener("mousedown", handleClick)
  // outside click 
};

useEffect(() =>{

  if(newGame){
    console.log("click On")
  document.addEventListener("mousedown", handleClick);
}
else{
  //return () => {
    document.removeEventListener("mousedown", handleClick);
  //};
 
}

}, [newGame])

  return (
    <div className="popup" ref = {inputRef}>
    <span className="popuptext" id="myPopup"></span>
    </div>
  )
}

export default PopUp

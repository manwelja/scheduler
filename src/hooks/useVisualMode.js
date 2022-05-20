import react, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (tMode, replaceFlag = false)  => {
    setMode(tMode);
    //if replaceFlag is true, remove the last state from history then add the new one, otherwise just add the new state to the history array
    //replaceFlag ?  setHistory([...history.slice(0, history.length-1), tMode]) : setHistory([...history, tMode]);
    if (replaceFlag) history.pop();
    setHistory([...history, tMode]);
  }  
  
  //Set the new mode to the previous one in the history, then remove the previous "last" state from the history array
  const back = () => {
    setMode(history[history.length-2])
    history.pop()
    //setHistory(history.slice(0, history.length-1)) 
  };

  return { mode, transition, back };
}
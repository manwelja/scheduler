import React from "react";
import "./DayListItem.scss"
import classNames from "classnames"

//component responsible for rendering individual days in the navigation side bar
export default function DayListItem(props) {
 
  //format the "number of spots" text to reflect the actual number of available appointment spots 
  function formatSpots(spots) {
    if(spots === 0) {
      return "no spots remaining";
    }
    if(spots === 1) {
      return "1 spot remaining";
    }
    if(spots >= 1) {
      return `${spots} spots remaining`;
    }
  }

  const dayListClass = classNames("day-list__item", 
    { " day-list__item--selected": props.selected },
    { " day-list__item--full": props.spots===0 }  
  );
  
  return (
    <li className={ dayListClass } onClick={ props.setDay } data-testid="day">
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{ formatSpots(props.spots) }</h3>
    </li>
  );
}


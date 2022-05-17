import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
 
  const dayItem = props.days.map((dayData) => {
    
    return(
      <DayListItem 
          key={dayData.id}
          name={dayData.name} 
          spots={dayData.spots} 
          selected={dayData.name === props.day}
          setDay={props.setDay}  
        />) 
    });

    return(
      <ul>{ dayItem }</ul>
    )

};

import React from "react";
import DayListItem from "components/DayListItem";

export default function DayList(props) {
  const dayItem = props.days.map((dayData) => {
    //return a populated daylist item (to be displayed in the navigation sidebar) for each day in the data set
    return(
      <DayListItem 
          key={dayData.id}
          name={dayData.name} 
          spots={dayData.spots} 
          selected={dayData.name === props.value}
          setDay={() => props.onChange(dayData.name)}  
        />) 
    });

    return(
      <ul>{ dayItem }</ul>
    )

};

import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames";

//Component that displays individual interviewer data
export default function InterviewerListItem(props) {
  //return an item for each interviewer passed in as a prop
  const interviewerListClass = classNames("interviewers__item",
   { "interviewers__item--selected": props.selected }
  );

  return (
    <li className={interviewerListClass} onClick={props.setInterviewer}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      { props.selected && props.name }
    </li>
  );

}
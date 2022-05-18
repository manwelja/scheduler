import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "./InterviewerList.scss";

export default function InterviewerList(props) {

  const interviewerItem = props.interviewers.map((interviewerData) => {
    
    return(
      <InterviewerListItem 
          key={interviewerData.id}
          name={interviewerData.name} 
          avatar={interviewerData.avatar}
          selected={interviewerData.id === props.value}
          setInterviewer={() => props.onChange(interviewerData.id)}  
        />) 
    });

  return (
    <section className="interviewers"> 
       <h4 className="interviewers__header text--light">Interviewer</h4>
       <ul className="interviewers__list">{ interviewerItem }</ul>      
    </section>
  )

}
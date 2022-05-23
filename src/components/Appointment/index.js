import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  
  const{ id, interview, time, interviewers, bookInterview, cancelInterview } = props;
  
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

    
function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer
  };
//Display the saving indicator
transition(SAVING);
//Book the new interview (call function to add it to the state object)
//When bookInterview resolves, show the updated schedule page
bookInterview(id, interview)
.then(() => transition(SHOW))
 
}

function cancel(id) {
  //conform that the user wants to delete
  transition(CONFIRM);
  //Display the deleting indicator
  transition(DELETING);
  //delete the selected interview and set the transition state for the block to empty
  cancelInterview(id)
  .then(() => {
    setTimeout(transition(EMPTY), 1000)
  });
 
}

  return(
    <article className="appointment">
      <Header time={ time }/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}        
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
            onDelete={() => cancel(id)}
          />)}
        {mode === CREATE && (
          <Form
            interviewers = { interviewers }
            onSave ={save}
            onCancel ={() => transition(EMPTY)}  

          />)}  
        {mode === SAVING && (
          <Status
            message={"Saving"}            
          />)}
        {mode === DELETING && (
          <Status
            message={"Deleting"}            
          />)}
    </article>
  );

}


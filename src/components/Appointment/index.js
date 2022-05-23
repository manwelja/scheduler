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
  
  const{ id, interview, time, interviewers, bookInterview } = props;
  
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

  return(
    <article className="appointment">
      <Header time={ time }/>
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
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
    </article>
  );

}


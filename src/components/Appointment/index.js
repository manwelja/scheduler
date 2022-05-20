import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  
  const{ interview, time, interviewers } = props;
  
  const { mode, transition, back } = useVisualMode(
    interview ? SHOW : EMPTY
  );

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
            onSave ={() => console.log("Saving")}
            onCancel ={() => transition(EMPTY)}
          />

        )}  
    </article>
  );

}


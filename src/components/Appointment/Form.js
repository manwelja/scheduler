import React, { useState } from "react";
import "./styles.scss";

import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const { interviewers, onSave, onCancel } = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }
  const cancel = () => {
    reset();
    onCancel();
  }  


  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            value={ student }
            onChange={(event) => { 
              setStudent(event.target.value);
            }}
          />
        </form>
        <InterviewerList 
          value={ interviewer }
          interviewers={ interviewers }         
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={ () => cancel() }>Cancel</Button>
         <Button confirm onClick={ () => {if (student && interviewer) onSave(student, interviewer)}}>Save</Button>         
        </section>
      </section>
    </main>
  ); 

}
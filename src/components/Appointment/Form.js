import React, { useState } from "react";
import "./styles.scss";

import InterviewerList from "../InterviewerList";
import Button from "../Button";

//Component to display new/edit interview form to the user for input
export default function Form(props) {
  const { interviewers, onSave, onCancel } = props;
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");
  
  const reset = () => {
    setStudent("");
    setInterviewer(null);
    setError("");
  }
  const cancel = () => {
    reset();
    onCancel();
  }  

  //Check to ensure both student name and interviewer fields are not blank before submit
  function validate(name) {
    
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Please select an interviewer");
      return;
    }  
    if(name && interviewer) setError("");

    onSave(name, interviewer);
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
            data-testid="student-name-input"
          />          
        </form>
        <section className="appointment__validation">{ error }</section>
        <InterviewerList 
          value={ interviewer }
          interviewers={ interviewers }         
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={ () => cancel() }>Cancel</Button>
          <Button confirm onClick={ () => { validate(student) }}>Save</Button>
        </section>
      </section>
    </main>
  ); 
}
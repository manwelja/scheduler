import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

import useVisualMode from "hooks/useVisualMode";

export default function Appointment(props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const EDIT = "EDIT";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM_DELETE = "CONFIRM_DELETE";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
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
.then((res) => {
  transition(SHOW)
})
.catch((err) => {
  //if there was an error with the booking, toggle to the ERROR_SAVE transition but don't add it to the history
  transition(ERROR_SAVE, true)
})
}

function confirm(id) {
  //confirm that the user wants to delete
  transition(CONFIRM_DELETE);
}

function cancel(id) {
  //Display the deleting indicator
  transition(DELETING);
  //delete the selected interview and set the transition state for the block to empty
  cancelInterview(id)
  .then(() => {
    setTimeout(transition(EMPTY), 1000)
  }).catch((err) => {
    console.log(err)
    //if there was an error with the deletion, toggle to the ERROR_DELETE transition but don't add it to the history
    transition(ERROR_DELETE, true);  
  })
 
}
  return(
    <article className="appointment">
      <Header time={ time }/>
      {/*show an empty appointment slot*/}  
        {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}     
        {/*show an interview item*/}     
        {mode === SHOW && (
          <Show
            student={interview.student}
            interviewer={interview.interviewer}
            onEdit={() => transition(EDIT)}
            onDelete={() => confirm(id)}
          />)}
        {/*show an empty form*/}    
        {mode === CREATE && (
          <Form
            interviewers = { interviewers }
            onSave ={save}
            onCancel ={() => transition(EMPTY)}  

          />)}  
        {/*show the editable form with any pre-existing values*/}    
        {mode === EDIT && (
          <Form
            student={interview.student}
            interviewer={interview.interviewer.id}
            interviewers = { interviewers }
            onSave ={save}
            onCancel ={() => transition(SHOW)}  

          />)}    
        {/*show status image with saving text*/}    
        {mode === SAVING && (
          <Status
            message={"Saving"}            
          />)}
        {/*show status image with deleting text*/}  
        {mode === DELETING && (
          <Status
            message={"Deleting"}            
          />)}
        {/*confirm delete  action*/}
        {mode === CONFIRM_DELETE && (
          <Confirm  
            message = "Are you sure you would like to delete?"
            onConfirm = {() => cancel(id)} 
            onCancel = {() => transition(SHOW)} 
          />)}  
        {/*show an error message in place of the appointment slot*/}    
        {mode === ERROR_SAVE && (
          <Error 
            message = "Error saving the current interview."
            onClose = {() => back()}             
          />)}  
        {/*show an error message in place of the appointment slot*/}      
        {mode === ERROR_DELETE && (
          <Error  
            message = "Error deleting the current interview."
            onClose = {() => back()} 
          />)}  
    </article>
  );

}


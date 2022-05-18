import React, { Fragment } from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";
import Error from "./Error";
import Confirm from "./Confirm";
import Status from "./Status";
import Form from "./Form";

export default function Appointment(props) {
 const{ id, interview, time} = props;
console.log(interview)
  return(
    <article className="appointment">
      <Header time={ time }/>
      {interview ? <Show student={ interview.student } interviewer={ interview.interviewer }/> : <Empty /> }
    </article>
  );

}


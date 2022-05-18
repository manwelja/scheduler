import React from "react";
import Header from "./Header";
import Empty from "./Empty";
import Show from "./Show";


export default function Appointment(props) {
 const{ interview, time} = props;

  return(
    <article className="appointment">
      <Header time={ time }/>
      {interview ? <Show student={ interview.student } interviewer={ interview.interviewer }/> : <Empty /> }
    </article>
  );

}


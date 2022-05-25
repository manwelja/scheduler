import React from "react";
import "./styles.scss";

//Component that displays animated status image in the schedule when an action in is progress
export default function Status(props) {

  const { message } = props;

  return (
    <main className="appointment__card appointment__card--status">
      <img
        className="appointment__status-image"
        src="images/status.png"
        alt="Loading"
      />
      <h1 className="text--semi-bold">{ message }</h1>
    </main>
  );
}
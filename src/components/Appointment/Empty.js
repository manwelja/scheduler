import React from "react";
import "./styles.scss";

//Component to display empty time slots in the schedule
export default function Empty(props) {

  return (
    <main className="appointment__add">
      <img
       className="appointment__add-button"
       src="images/add.png"
       alt="Add"
       data-testid="add"
       onClick={ props.onAdd }
      />
    </main>
  );

}
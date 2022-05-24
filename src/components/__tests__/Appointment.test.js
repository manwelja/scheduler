import React from "react";

import { render } from "@testing-library/react";

import Application from "components/Application";
import Appointment from "components/Appointment/index";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";
import Status from "components/Appointment/Status";


describe("Appointment", () => {
  const interviewer = {
      id: 1,
      student: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    };

  it("renders Application without crashing", () => {
    render(<Appointment />);
  });

  it("renders Confirm without crashing", () => {
    render(<Show student = {"someone"} interviewer={interviewer} />);
  });

  it("renders Show without crashing", () => {
    render(<Confirm  />);
  });

  it("renders Error without crashing", () => {
    render(<Error message="Test error message"  />);
  });

  it("renders Status without crashing", () => {
    render(<Status message="Test status message"  />);
  });
  
});
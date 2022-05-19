import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment"
import { getAppointmentsForDay } from "helpers/selectors"

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
 
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {        
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data}))
    }), []})
  
  
  const dailyAppointments = (getAppointmentsForDay(state, state.day));  

  const apptArray = dailyAppointments.map(appointment => {
    return(
      <Appointment 
      key={appointment.id}
      {...appointment}
    />) 
  });

  return (
    <main className="layout">
        <section className="sidebar">
          <img
            className="sidebar--centered"
            src="images/logo.png"
            alt="Interview Scheduler"
          />
          <hr className="sidebar__separator sidebar--centered" />
          <nav className="sidebar__menu">
           <section className="schedule">
            <DayList
               days={state.days}
               value={state.day}
               onChange={setDay}
            />
           </section>
          </nav>
          <img
            className="sidebar__lhl sidebar--centered"
            src="images/lhl.png"
            alt="Lighthouse Labs"
          />
        </section>
       <section className="schedule">
        { apptArray}
         <Appointment key="last" time="5pm" />
      </section>
      
    </main>
  );
}
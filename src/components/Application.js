import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "components/DayList";
// import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment"
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  
  const setDay = day => setState({ ...state, day });
  const setDays = days => setState(prev => ({ ...prev, days }));
 
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {        
      setState(prev => ({...prev, days:all[0].data, appointments:all[1].data, interviewers: all[2].data}))
    })
  },[])
  
  function bookInterview(id, interview) {
    //create a new appointment object - use the spread operator to create a shallow copy
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //create a new appointments object - use the spread operator to create a shallow copy
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log(appointment.interview.interviewer)

    //add the new interview to the scheduler api
    //return the promise so we can update the schedule page AFTER the api is updated
    return axios.put(`api/appointments/${id}`, {interview: {student: appointment.interview.student, interviewer: appointment.interview.interviewer}})
      .then((res) => {
       //add the new appointment to the state object
       setState({...state, appointments});
       return;
    })
    //.catch((err) => {
     //   console.log(err.message)     
   // })
  } 
  function cancelInterview(id) {
   
    const appointment = {
      ...state.appointments[id],
      interview: state.interview
    };

    const appointments = {
      ...state.appointments, 
      [id]: appointment    
    };
    state.appointments[id].interview = null;

    return axios.delete(`api/appointments/${id}`)
    .then((res) => {
      //delete the appointment from the state object (putting appointments last overwrites what was prev defined in the state object)
      setState({...state, appointments});
    })
    //.catch((err) => {
    //  console.log(err.message)        
    //  return(err)   
  //  })
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day);  
  const interviewers = getInterviewersForDay(state, state.day)

  const apptArray = dailyAppointments.map(appointment => {
    const interview = getInterview(state, appointment.interview);
      return(
        <Appointment 
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}   
        cancelInterview={cancelInterview}            
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
         <Appointment 
           key="last" 
           time="5pm" 
         />
      </section>
      
    </main>
  );
}

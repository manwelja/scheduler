import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState({ ...state, day });

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
    
    //add the new interview to the scheduler api
    //return the promise so we can update the schedule page AFTER the api is updated
    return axios.put(`api/appointments/${id}`, {interview: {student: appointment.interview.student, interviewer: appointment.interview.interviewer}})
      .then((res) => {
      //add the new appointment to the state object
      setState({...state, appointments});
      return;
    })
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
      return;
    });
  }
  return { state, setDay, bookInterview, cancelInterview };
}
import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => {setState({ ...state, day }); console.log(state)};

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
         const newState = updateSpots({...state, appointments});
        //update the state with the updated appointments object and number of slots
        setState({...newState});
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
      const newState = updateSpots({...state, appointments});
      //count amount of of null interviews for the day 
      setState({...newState});
      return;
    })      
  }

  function countSpots(state) {
    //get the object representing the current day
    const currentDay = state.days.find(day => day.name === state.day);    
    const appointmentIds = currentDay.appointments;

    //count amount of of null interviews for the day 
    const spots = appointmentIds.filter((id) =>!state.appointments[id].interview).length;
    return spots;
  }

  const updateSpots = state => {
    //declare the state object that is going to be returned after being updated with the current number of available spots 
    const updatedState = {...state};
  
    //declare an array that will hold all of teh individual day objects in the current state
    const updatedDays = [...state.days];
    
    //get the currently selected day object (where the appointment is being modified)
    const updatedDay = {...state.days.find((day) => day.name === state.day)};

    //retrieve the number of available spots
    const spots = countSpots(state);

    //update the number of spots in the "updated" day object
    updatedDay.spots = spots;

    //get the index of the currently selected day
    const updatedDayIndex = state.days.findIndex(day => day.name === state.day)

    //update the selected day in the object containing all days
    updatedDays[updatedDayIndex] = updatedDay;

    //update the new state object with the updated list of days
    updatedState.days = updatedDays;

    return updatedState;
  }
  return { state, setDay, bookInterview, cancelInterview };
}
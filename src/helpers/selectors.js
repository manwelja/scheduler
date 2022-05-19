
export function getAppointmentsForDay(state, day) {
  //const filteredDays = state.days.filter(sDay => sDay.name === day);
  //const filteredAppts = state.appointments.filter(sAppt => sAppt.id === filteredDays[0]);
  const filteredApptDay = state.days.filter(sDay => sDay.name === day);
  const apptArr = [];
  if(filteredApptDay.length === 0) return [];
 
  const appointmentKeysArr = filteredApptDay[0].appointments;
  
  appointmentKeysArr.forEach((element) => {
    if (state.appointments[String(element)]) apptArr.push(state.appointments[String(element)])     
  });    
  
  return apptArr;
 
  
}
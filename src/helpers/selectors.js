
//function to take in days and appointments and return all appointments for the selected day
export function getAppointmentsForDay(state, day) {
  //get the appt ids for the selected day
  const filteredApptDay = state.days.filter(sDay => sDay.name === day);
  const apptArr = [];
  
  //if no appts return empty array
  if(filteredApptDay.length === 0) return [];
 
  const appointmentKeysArr = filteredApptDay[0].appointments;
  
  //get all appt objects that correspond to the appt ids for the selected day
  appointmentKeysArr.forEach((element) => {
    if (state.appointments[String(element)]) apptArr.push(state.appointments[String(element)])     
  });    
  
  return apptArr;
 
  
}
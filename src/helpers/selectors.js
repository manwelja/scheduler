
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
//Function to format the interview object
export function getInterview(state, interview) {
  //if there is no interview, return null
  if(!interview) return null;

  //create a shallow copy of the interview object
  const formatInterview = {...interview};

  //replace the interviewer id in the interview object with their full data from the state object
  formatInterview.interviewer = state.interviewers[String(interview.interviewer)];
 
  return formatInterview;
}

export function getInterviewersForDay(state, day) {
  //get the appt ids for the selected day
  const filteredApptDay = state.days.filter(sDay => sDay.name === day);
  const interviewerArr = [];
  
  //if no matching days return empty array
  if(filteredApptDay.length === 0) return [];
 
  const interviewersKeysArr = filteredApptDay[0].interviewers;
  
  //get all interviewer objects that correspond to the interveiwer ids for the selected day
  interviewersKeysArr.forEach((element) => {
    if (state.interviewers[String(element)]) interviewerArr.push(state.interviewers[String(element)])     
  });    
  
  return interviewerArr;
}
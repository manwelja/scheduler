describe("Appointments", () => {
  beforeEach(() => {
      //reset the test database
      cy.request("GET", "/api/debug/reset");
    
      //load the scheduler app 
      cy.visit("/");    
      cy.contains("Monday");      
  });

  it("should book an interview", () => {
     
    //get a handle on the Add images and click on the first one (first available appt slot)
    cy.get("[alt=Add]").first().click();

    //get a handle on the student name input box and enter a name  
    cy.get("[data-testid=student-name-input]").type("Lydia Miller-Jones");

    //get a handle on the interviewer list and select an interviewer
    cy.get("[alt='Sylvia Palmer']").click();

    //save the form
    cy.contains("Save").click();

    //check to ensure the new interview is showing in the schedule (verify student and interviewer name are present on page)
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
        
  });

  it("should edit an interview", () => {
    
    //get a handle on the Edit image of the first interview and click it
    cy.get("[alt=Edit]").as("editButton")  
    cy.get("@editButton").first().click({ force: true }) 

    //change the strudent and interviewer names      
    cy.get("[data-testid=student-name-input]").clear().type("Lydia Miller-Jones");
    cy.get("[alt='Tori Malcolm']").click();
  
    cy.contains("Save").click();
 
    //check to ensure the new values are displaying in the schedule
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  });  

  it("should cancel an interview", () => {
    //force click the delete image
    cy.get("[alt=Delete]").click({ force: true });

    //click confirm
    cy.contains("Confirm").click();

    //ensure the deleting status indicator displays and disappears 
    cy.contains("Deleting").should("exist");
    cy.contains("Deleting").should("not.exist");

    //make sure appointment is no longer showing
    cy.contains(".appointment__card--show", "Archie Cohen").should("not.exist");

  });  
});

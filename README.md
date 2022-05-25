# Scheduler Application

The scheduler application is an interactive medium where users can book, edit and delete interviews on different days with a selection of interviewers.


## Project Functionality Overview
  -  users can book new interviews
  -  users can edit existing interviews
  -  users can delete existing interviews
  -  users can see a list of all interviews for a given day
  -  users can see the number of appointment spots available for each day
  -  error checking is in place to catch errors that occur while saving,deleting or editing interviews


## Final Product - Screenshots of Scheduler Application

### 1. Main Schedule Page
!["Main schedule page"](https://github.com/manwelja/scheduler/blob/master/docs/main_screen.png)

### 2. Schedule a New Interview
!["Blank interview form in edit mode"](https://github.com/manwelja/scheduler/blob/master/docs/new_interview.png)

### 3. Edit an Existing Interview
!["Interview form in edit mode"](https://github.com/manwelja/scheduler/blob/master/docs/edit_interview.png)

### 4. Confirm Delete Dialog
!["Confirmation prompt when user chooses to delete an interview"](https://github.com/manwelja/scheduler/blob/master/docs/confirm_delete.png)

### 5. New Interview Error
!["Error displayed if user tries to submit incomplete form"](https://github.com/manwelja/scheduler/blob/master/docs/new_interview_error.png)

## Project Setup Instructions

  1. Create a new repository using this repository as a template.
  2. Clone your repository onto your local device.
  3. Install dependencies using the npm install command.
  4. Install and launch the API server (https://github.com/lighthouse-labs/scheduler-api)
  4. Start the web server using the npm start command. The app will be served at http://localhost:8080/
  5. Go to http://localhost:8080/ in your browser.
  
  Note that this application communicates with an API server (https://github.com/lighthouse-labs/scheduler-api) over HTTP, using JSON format.  

## Dependencies
  -  Axios 0.27.2 or above
  -  Node 5.10.x or above  
  -  Classnames 2.2.6 or above
  -  normalize.css 8.0.1 or above
  -  React 16.9.0 or above
  -  react-dom 6.9.0 or above
  -  react-scripts 3.4.3 or above
  
## Testing 
### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```

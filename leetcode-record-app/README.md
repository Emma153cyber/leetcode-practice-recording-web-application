# Leetcode Practice Recording Application

This web application helps you track your Leetcode practice problems

## Features

- Users can login with their username to access their own account
- Users can record the `Number of Leetcode`, `Name of Leetcode`, `Practing day`, `Leetcode difficulty level`, `Leetcode link`, `Status of Progress`, and the history status for each problem
- Sorting the recordings by application status
- Users can edit the Problem status and/or check for the history status of the Leetcode problem
- Popular Leetcode links are provided, along with a search window to search for Leetcode solutions on Google

## How to use

#### Run the application

- Download the code to your local machine

- Navigate to YOUR-CODE-PATH/ : `cd YOUR-CODE-PATH/`

- `npm install` and then `npm run build` to install the dependencies, and then `npm start` to run the server

- Go to `http://localhost:3000`

- To run the development server, use npm run dev, then go to http://localhost:4000

#### Application rules

- Login

  - Users must log in with a valid username (can only contains numbers and letters)
  - `dog` is an invalid username. You cannot use it as your username

- Add a new Leetcode Problem
  - Click on the `Add new problem` button to push a new Leetcode application
  - The Leetcode title and Leetcode description link must have at least one entry
  - No. of Leetcode must be numbers
  - The submission day format must be `MM/DD/YYYY`, or you are not allow to add a new problem
- Update a status of the problem
  - Click on the `UPDATE` button to access the edit form for the problem you want to update
  - Shortcut keys are available to update the status of the Leetcode problem as mastered, practicing, or review with a single click
  - Click on the `DELETE` button to delete this problem

## Technical details include

### Backend

- Implementing a RESTful API for user login, logout, and fetching current user information is a common use case for the popular Node.js web framework, Express.

### Frontend

- Design SAP with React
- Manage global variables and pass data from a parent component to its descendants by using 'Context'
- Use 'Redux' to manage the status of the Page
  following status including login, logout, addProblem, updateHistory, updateCollection, updateCollection, deleteProblem
- use 'useState', 'UseEffect' in this application to ensure that components are properly updated and render the correct information to the user

### Proxy

- frontend: "proxy": "http://localhost:4000" in package.json
- backend: PORT = 4000

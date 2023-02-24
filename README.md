# challenge_12: Employee Tracker

The scope of this challenge is  to build a command-line application from scratch, referred to as a  **content management systems (CMS)** to manage a company's employee database, using Node.js, Inquirer, and MySQL.


A a simple app for managing a employees database  using `Node`, `InquirerJs`, and `MySQL`.

## Project Links
[Repo Link](https://github.com/PanosGian/challenge_12) <br>
**NOTE:** Since this application cannot be deployed on GitHub please see the **Demo** section below for an overview of its functionality and the **Getting Started** section for more information regarding installation, usage, contribution guidelines, tests and where to go for questions.

Because this application won’t be deployed,it is required to create a walkthrough video that demonstrates its functionality and all of the following acceptance criteria being met. A link to the video will be added to this README file 
    
## About The Project

This project scope was to create an application that can be used to create an interface or `Content Management System` that makes it easy for non-developers to view and interact with information stored in databases. The project's scope included architecting and building a solution for managing a company's employees using `Node`, `InquirerJs`, and `MySQL`. `console-table` is used to presentthe data base selection into a formated table. 

The dependencies are `MySQL`, `InquirerJs`, and `Console.table`. `ASCIIart-logo npm` and `Chalk npm` are also dependencies for colorful text and splash screens at the beginning and end of the application.

Because this application cannot be deployed on GitHub, a walkthrough video demonstrates its functionality below.


## User Story

```
As a business owner
I want to be able to view and manage the departments, roles, and employees in my company
So that I can organize and plan my business
```

## Acceptance Criteria

```
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Video Demo
The video is storred in the **./assets** foler of this project.
The following is a video of the employee tracker application performance and its functionality:![Video](assets/Video_Challenge_12.mp4)

## Getting Started
    
#### Languages, packages + runtime environment used in this project:
* JavaScript 
* Node.js
* Inquirer npm
* Console.table npm
* ASCIIart-logo npm
* Chalk npm
* Console.table npm
    
#### Installation: 
```  
Through GitHub Repository: https://github.com/PanosGian/challenge_12
```
#### Usage 
```
The application is a solution for managing a startup company's employees using Node, InquirerJs, and MySQL. See demo video above for more information on how it works.
```
#### Tests
```
Enter command 'npm install mysql inquirer console.table' after cloning the repo to install MySQL, Inquirer npm and console.table npm. The application will be invoked by entering the following in the command line: 'npm start'.
```    


### License
 Distributed under the MIT License. See `LICENSE` for more information.

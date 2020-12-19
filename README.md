# Exmployee Tracker
  ## Table of Contents
  - [Description](#description)
  - [Installation](#installation)
  - [Code Explanation](#code-explanation)
  - [Video Walkthrough](#video-walkthrough)
  - [Contact Me](#contact-me)

  ## Description
  This Node CLI application allows a manager to view and update departments, roles, and employees of their companies. The application is connected to a SQL database built using MySQL Workbench. Inquirer is used to gather user input, and the node mysql package is used to link the SQL database.     
  

  ## Installation
  A user can install this package using the following command:
  ```
  npm install
  ```
  

  ## Code Explanation
  This code starts by requiring the npm packages for mysql and inquirer. Then it connects to the sql database using the createConnection method. 

  The first function that runs in the application questions the user on what action they would like to take. Based on the action the user chooses, another function is run that corresponds to the choice of the user. 

  The functions written query the sql database at least once using SELECT, INSERT INTO, or UPDATE statements, depending on what the user wanted to do. 
  

  ## Video Walkthrough
  https://drive.google.com/drive/u/0/folders/1nFqdlIFAcmDRm1h6UUb6CCuF963U1R5k
  
  
  ## Contact Me
  You can check out my GitHub profile at https://www.github.com/shannonquinn91 or email me at shannon.quinn91@gmail.com.
  
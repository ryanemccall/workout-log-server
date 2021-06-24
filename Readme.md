Workout Log Server Project
Have User Authentication
Follow an MVC pattern.
Persist data to Postgres.
Use all of the key concepts studied in the previous modules, including , , and .
You will build a client later, using React. You do not need a client for this. We will use this to teach client side Authentication with React.
Your endpoints must show signs of having been tested(screenshots of successful Postman request in a  file are always handy)
 

Required Endpoints
 

The project should have the following endpoints:
Endpoint	Verb	Description
/user/register	POST	Allows a new user to be created with a username and password.
/user/login	POST	Allows log in with an existing user.
/log/	POST	Allows users to create a workout log with descriptions, definitions, results, and owner properties.
/log/	GET	Gets all logs for an individual user.
/log/:id	GET	Gets individual logs by  for an individual user.
/log/:id	PUT	Allows individual logs to be updated by a user.
/log/:id	DELETE	Allows individual logs to be deleted by a user.
 

Data Models

In addition to the columns automatically generated by Sequelize, the  model requires the following columns and data-types:

Data Types
Property	Type
username	STRING
passwordhash	STRING
 


In addition to the columns automatically generated by Sequelize, the  model requires the following columns and data-types:

Data Types
Property	Type
description	STRING
definition	STRING
result	STRING
owner_id	INTEGER
 

Additional Information
The user should not provide the id associated with their user account. This value should come from the validateSession middleware function. 
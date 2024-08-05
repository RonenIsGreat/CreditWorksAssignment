CreditWork programming assignment.

I have a Mac, so my working setup is Visual Studio Code as the IDE for frontend in React.js with typescript and backend in C# targeted to .Net7.0 that uses Entity Framework MVC.
For the Database, I pulled a docker image of MSSQL 2022 on a Linux container.


Microsoft SQL Server setup:
* Skip this step if you already got MSSQL server.
Setup with Docker image:
1. Install Docker
https://www.docker.com/products/docker-desktop/
2. Fetch docker image for MS-server. Can use this guide:
https://learn.microsoft.com/en-us/sql/linux/quickstart-install-connect-docker?view=sql-server-ver16&tabs=cli&pivots=cs1-bash


Database setup:
Run the script InitDatabase.sql to create CreditWorks_RonenRossin database with tables in MSSQL.

Change the connection string in the backend to include your user and password to your MSSQL:
1. Go to /backend/Models/CreditWorksContext.cs
2. "OnConfiguring" method has connectionString variable.
3. Update User Id and password to your local MSSQL user. 


Backend setup:
The application backend C# targeted to .net7 in "backend" directory.
1. CD to the "backend" directory.
2. Run "dotnet build" to build the project.
3. Run "dotnet run" to run it.
You can view and interact with the API with Swagger by accessing http://localhost:5454/


Frontend setup:
The application frontend side in React.js.
1. CD to the "frontend" directory.
2. Run "npm i" to install dependencies.
3. Run "npm start" to run it.
4. Access by http://localhost:3000/ to view the page in your browser.



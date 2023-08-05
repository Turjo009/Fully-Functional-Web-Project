# Web Application Overview

A Web Application which hosts a server of a university club management website.

### Implementations of features:

- Users without accounts should be able to view public information and updates for a club.
- Users should be able to sign up and log in to the system in order to
  - Sign up/log in.
  - Manage their user information.
  - Join a club.
  - View updates from clubs they're members of.
  - See upcoming club events and RSVP.
- Club Admins should be able to log in in order to:
  - Sign up/log in.
  - Manage their user information.
  - Manage Users.
  - Manage Clubs.
  - Sign-up other Admins.
  - View their members
  - Post updates both publicly, and privately to their members.
  - Create and update club events.
  - See who has RVSP'd for an event.
- Email notifications
 - Users who signed up will receive email notifications from clubs for things like updates and special events.

(Note that there is a demonstration video of all the features located in /Demonstration/Club Website Demonstration.mp4)


### Programming knowledge applied:

* HTML, CSS and Javascript (AJAX and Vue.js) used for front-end development
* Express server used for back-end development of the server
* MySQL used to create the database which is used to store the user credentials
* cookies and server sessions has been used to identify users.

### Key Learnings Outcomes: 

1. Understand principles of designing user friendly websites.    
2. Write standards compliant websites in HTML & CSS.  
3. Develop dynamic, client-side web content using Javascript.    
4. Understand the interactions between the client-side and server-side components of web applications.  
5. Design and build AJAX calls to a server and handle responses.  
6. Use third party APIs in web applications.  
7. Understand the role of databases in web applications.  
8. Plan & integrate a database into a web application.  
9. Understand and mitigate security issues faced by web applications.

## How to run the website:

 - If not already installed make sure to npm install express, body-parser, mysql, path, nodemailer, express-session and axios beforehand
 - Run the 'database_setup.sql' file to setup the database and tables for the website to function. Additionally, check the 'index.js' file to make sure that the details when setting up a connection to the database match up with your own.
 - Finally run 'node index.js' to start the website.
 - Final database in final_database.sql

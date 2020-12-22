# Productivity Planner

## Table of Contents
* [Description](#description)
* [Usage](#usage)
* [Installation](#installation)
* [Screenshots](#screenshots)
* [Credits](#credits)
* [Links](#links)

## Description
The Productivity Planner provides users with the tools they need to plan and achieve their goals, while also providing an option to view and support others in accomplishing tasks. This planner prevents users from having to utilize multiple applications to plan out their days ahead. Now, all it takes is one application to put you on the path to success.

The Productivity Planner provides users with the option to list their goals, plan their days with an hourly and daily calendar, track their progress, take notes, and view and share their progress with other users in their community. All of this is done using a SQL database. The planner also has some encouraging quotes and an aestheticly pleasing color scheme to help the user feel confident and focused on being productive.


## Usage
As a user:
I want to be able to set goals and track them via a calendar, so that I can keep track of my goals and progress.

Login/Signup Pages    
The signup page can be used the first time a user is using the site. If the user enters a login that is already saved in the database, the signup page will not let the user login. The login page is to be used for users that already have a login.

Dashboard Page  
The dashboard is the home page that the user is directed to after logging in to the application. The navbar is consistent throughout the application and allows the user to move between the pages. The dashboard displays 7 days (always starting with today) to plan out your next week; clicking on these brings you to the day planner page. Since each day planner page is date-specific, this is the only way to access those pages (there isn't a navbar option for them).

Day Planner Page  
The day planner page is used to keep track of daily items. There's a schedule where you can meetings/plans in hour increments, a goals input where you can enter and check off daily goals, and a notes section for writing anything you don't want to forget. All of these sections have a submit/save button which logs that information to the database. This page is date-specific, so anything saved here won't be present on another day. We also included a productivity timer to help the user with time management. The toggle option lets you keep track of work time or break time, depending on what you need. This timer was based off a class activity (see credits below).

Weekly Goals Page  
The weekly goals page lets you add larger goals for what the user would like to accomplish that week. After adding a goal, it is populated in the goal list. There are options to start the goal (which moves it to the "in progress" column) and to complete the goal (which moves it to the "achievements" column). These goals can be deleted once completed, or left as achievements to encourage yourself. The top 5 goals are also rendered on the dashboard page with their current status for quick reference when the user logs in. 

Community Page  
The community page is for users to make blog posts that other users can see. There's a feed section to see posts from other users and sections to write and see the blog posts that the logged in user has created. This is a great area for friends to come together and encourage each other in completing their goals.


## Installation


## Screenshots
Below are screenshots of our deployed application. Click on any of them to be redirected to the application deployed on Heroku.

Login Page  
<a href="https://obscure-lake-47661.herokuapp.com/" target="_blank"><img src="./public/images/login-form.png" 
alt="Login Page" width="900"/></a>

Dashboard Page  
<a href="https://obscure-lake-47661.herokuapp.com/" target="_blank"><img src="./public/images/dashboard.png" 
alt="Dashboard Page" width="900"/></a>

Day Planner Page  
<a href="https://obscure-lake-47661.herokuapp.com/" target="_blank"><img src="./public/images/day-planner.png" 
alt="Day Planner Page" width="900"/></a>

Weekly Goals Page  
<a href="https://obscure-lake-47661.herokuapp.com/" target="_blank"><img src="./public/images/weekly-goals.png" 
alt="Weekly Goals Page" width="900"/></a>

Community Page  
<a href="https://obscure-lake-47661.herokuapp.com/" target="_blank"><img src="./public/images/community-page.png" 
alt="Community Page" width="900"/></a>


## Credits
* UNCC Coding Bootcamp- We patterend our productivity timer off of a class activity, so that wasn't all our code! We were also given starter code for the Passport portions of the application with a login and signup page already working.

Contributors!
* Avery Brown-Gathings: https://github.com/averyjbrown2
* Lindsay Morris: https://github.com/lindsaymorris813
* Lorena Ramirez: https://github.com/Lorena-Ramirez
* Maren Hamby: https://github.com/marenhamby

## Links

Deployed link on Heroku: https://obscure-lake-47661.herokuapp.com/

Link to our code on GitHub: https://github.com/averyjbrown2/Project-2




# Idealists

This is the back end of Idealists platform for collecting and validating ideas. It provides an API with user login functionality, dynamic questionaire and answers saving (as JSON). You can find list of endpoints further in this document. 
Security is not fully implemented since the front end was not finished completely/left in development mode. The basis for security implementation however is good and it can be easily applied. 

**If you would like to review the code please contact me on crvicek@yahoo.com**

## Technologies used
- Node.js
- Express server
- Postgres DB
- TypeScript
- JWT
- Bcrypt
- Routing controllers

## Install instructions
clone, npm install, run docker/postgres on 5432, npm run start

## Functionality
### Email notification is sent:
* when new user registers
* when new idea is submitted
* when automatch results are ready for user review
* when status of the idea changes
It is possible to make templates for the emails and use the template name in the sendEmail function (look emailOptions.ts).

### Automatch:
* on idea submission server sends detailed idea description to ipscreener patent checker API, saves the returned ticket, waits a minute and requests the result with the ticket. The current setup on the front end required that the structure of the idea object is "` object.['idea'][4]['answers'][0]['qAnswer'] `". Optimisation of this should be done together with the front end.

### Security:
All requests (except user post and login) should be done with the authorization header "Bearer _token_". Token is returned when valid email and password are posted to /login.

## Endpoints
### User
When a new user registers a confirmation email is send to user's email.
- **@Post('/login')** returns a JWT when user logs in with a valid email and password
- **@Get("/current")** return the user info based on provided authorization header
- **@Get("/users")**
- **@Post("/users")** user object has: {firstName:'', lastName:'', email:'', password:'', role: (user/expert/admin), country:'', industry:''}
- **@Get("/users/:id")**
- **@Put("/users/:id")**
- **@Delete("/users/:id")**

### Ideas
Idea (answers to the questions) is also saved as JSON,
When new idea is submitted server sends request to AutoMatch API.
- **@Get("/ideas")** returns ideas based on user role:
  - admin: all ideas,
  - expert: ideas matching the industry,
  - normal user: their own ideas
- **@Get("/ideas/:id")**
- **@Post("/ideas")**
- **@Put("/ideas/:id")**
- **@Delete("/ideas/:id")**

### Automatch
After new idea is submitted, automatch result is accesible within couple of minutes through
- **@Get("/ideas/:id/automatch")**

### Progress
Idea progress is being saved in 10 steps (step01: boolean)
- **@Get("/ideas/:id/progress")**
- **@Put("/ideas/:id/progress")**

### Questionaire - Not used in the front end atm
All the questions are saved as JSON
- **@Get("/quest")**
- **@Get("/quest/:id")**
- **@Post("/quest")**
- **@Put("/quest/:id")**
- **@Delete("/quest/:id")**

## Deployment
The app is deployed on Heroku. To get the link please get in touch.


_For more info you can contact me on crvicek@yahoo.com_

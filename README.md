# Idealists

This is the back end of Idealists platform for collecting and validating ideas. It provides an API with user login functionality, dynamic questionaire and answers saving (as JSON) and file upload functionality. You can find list of endpoints further in this document. 
Security is very poorly implemented since the app was not finished completely/left in development mode. The basis for security implementation however is good and it can be easily applied.  

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

## Endpoints

### User
When a new user registers a confirmation email is send to user's email.
- **@Post('/login')** returns a JWT when user logs in with
- **@Get("/current")** return the user info based on provided authorization header
- **@Get("/users")**
- **@Get("/users/:id")**
- **@Put("/users/:id")**
- **@Delete("/users/:id")**

### Questionaire
All the questions are saved as JSON
- **@Get("/quest")**
- **@Get("/quest/:id")**
- **@Post("/quest")**
- **@Put("/quest/:id")**
- **@Delete("/quest/:id")**

### Ideas
Idea (answers to the questions) is also saved as JSON,
When new idea is submitted server sends request to AutoMatch API for idea validation - partially implemented
- **@Get("/ideas")**
- **@Get("/ideas/:id")**
- **@Post("/ideas")**
- **@Put("/ideas/:id")**
- **@Delete("/ideas/:id")**

### Automatch - partially implemented
When new idea is submitted, API sends request to mock-api (returns the same result form as the real AutoMatch) and saves the response in DB. These responses are available through:
- **@Get("/automatch")**
- **@Get("/automatch/:id")**

### File upload
Form for uploading files should have these params: 

```
<form action=".../upload" enctype="multipart/form-data" method="POST">
  <input type="file" name="UserFile" id="UserFile" required />
  <input type="submit" value="Upload" />
</form> 
```

- **@Get("/upload")**
- **@Get("/upload/:id")**
- **@Post("/upload")**
- **@Delete("/upload/:id")**


### Survey -> NOT USED IN CLIENT DUE TO LATER ADAPTATIONS
- **@Get("/surveys")**
- **@Get("/surveys/:id")**
- **@Post("/surveys")**
- **@Put("/surveys/:id")**
- **@Delete("/surveys/:id")**

### Groups -> NOT USED IN CLIENT DUE TO LATER ADAPTATIONS
- **@Get("/surveys/:surveyId/groups")**
- **@Get("groups/:id")**
- **@Post("/surveys/:surveyId/groups")**
- **@Put("/groups/:id")**
- **@Delete("/groups/:id")**

### Questions -> NOT USED IN CLIENT DUE TO LATER ADAPTATIONS
- **@Get("/groups/:id/questions")**
- **@Get("/questions/:id")**
- **@Post("/groups/:groupId/questions")**
- **@Put("/questions/:id")**
- **@Delete("/questions/:id")**



_For more info you can contact me on crvicek@yahoo.com_

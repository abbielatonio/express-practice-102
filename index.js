import express, { response } from 'express';
import FilterValidateMiddleware from './middleware/FilterValidateMiddleware.js';

const app = express();
const PORT = '3000';

const  users  = [
  { id:1, firstName: 'b1', lastName: 'hello' },
  { id: 2, firstName: 'b2', lastName: 'mello' },
]; 

app.use(express.json()); //middleware json para di undefined



//.........................................................................101: task1
app.get('/', (request, respond) => {
  respond.json({ message: 'hello world' });
  
});


//.........................................................................101: task2 , task 6
//app.post('/users', ValidateEmailMiddleware, (request, response) => {  
//return response.status(201).json(request.body); 


//});

//.........................................................................101: task2 , task 3, task 6

app.post('/users', FilterValidateMiddleware, (request, response) => {
  
  const newUser = {
    id: users.length + 1, // id ng newuser is ilan yung exissting users + 1..................................102: task 3
    firstName: request.firstName,
    lastName: request.lastName,
    email: request.email, //  expected thanks to filtermiddleware
  };


  if(users.filter(user=> user.email === newUser.email).length !== 0) { //........................................102:task2
    return response.status(400).json({
      error: 'email exists',
    });
  }

  // HAPPY PATH
  users.push(newUser); //push newuser in users array
  response.status(201).json(newUser);
});


//.........................................................................101: task5
//get all users through this route
app.get('/users', (request, response) => {
  response.json(users);
});


app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));

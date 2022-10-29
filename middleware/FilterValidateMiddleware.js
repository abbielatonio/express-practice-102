
export default function FilterValidateMiddleWare(request, response, next) {


  const { id, firstName, lastName, email } = request.body; 
  
  
  if (!email.includes("@")) {
    return response.status(400).json({
      error: 'Invalid email',
    });
  }
  
  request.firstName = firstName;
  request.lastName = lastName;
  request.email = email;
  request.id = id;
  
  
  next();
  }
  
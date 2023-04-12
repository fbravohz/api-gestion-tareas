// Importing the UserModel class
const UserModel = require('../model/userModel');

/**
 * This function validates if the user is authenticated with the api Key
 * @param req - the request object
 * @param res - the response object
 * @param next - the next function
 */
const apiKeyMiddleware = async (req, res, next) => {
  // Getting the API key received in the header from the client
  const receivedApiKey = req.header(process.env.API_KEY_NAME);
  // if the API key is not provided, return unauthorized
  if (!receivedApiKey)
    return res.status(401).send({"message": 'API key required'});
  // Instantiate the UserModel object
  const userModel = new UserModel();
  // Calling the getUserByApiKey method authenticate the user
  const result = await userModel.getUserByApiKey(receivedApiKey);
  // If the apikey was not found in the query, return forbidden
  if (!result?.apiKey)
    return res.status(403).send({"message": 'Invalid API key'});
  // Deleting the apiKey to prevent exposure of the key to the client
  delete result?.apiKey;
  // Using the express' res.locals property to save a global variable
  // through the lifecycle of the request
  res.locals.auth = result;
  // Calling the rest of the elements in the middleware
  next();
}

// Export apiKeyController as default
module.exports = apiKeyMiddleware;


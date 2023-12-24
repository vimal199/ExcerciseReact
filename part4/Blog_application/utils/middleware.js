const logger = require("./logger");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const requestLogger = (request, response, next) => {
  logger.info("Method: ", request.method);
  logger.info("Path: ", request.path);
  logger.info("Body: ", request.body);
  logger.info("---");
  next();
};
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown " });
};
const tokenExtracter = (request, response, next) => {
  const authorization = request.get("authorization");
  console.log("authorization is ", authorization);
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    request.token = null;
  }
  next();
};
const userExtracter = async (request, response, next) => {
  const authorization = request.get("authorization");
  console.log("authorization is ", authorization);
  if (authorization && authorization.startsWith("Bearer ")) {
    const decodedToken = jwt.verify(
      authorization.replace("Bearer ", ""),
      process.env.SECRET,
    );
    const user_id = decodedToken.id;
    console.log("user id from token ", user_id);
    const getUser = await User.findById(user_id);
    console.log("user at middleware ", getUser.blogs);
    if (getUser) {
      request.user = getUser;
    }
  }
  next();
};
const errorHandler = (error, request, response, next) => {
  logger.info(error.message);
  if (error.name === "CastError") {
    return response.status(404).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({ error: "Token expired" });
  }
  next(error);
};
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtracter,
  userExtracter,
};

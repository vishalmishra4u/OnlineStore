var jwt = require('jsonwebtoken'),
  SECRET = sails.config.session.secret;

var Q = require('q');

module.exports = {
  generateToken: generateToken,
  getAuthenticatedResponse: getAuthenticatedResponse,
  validateToken: validateToken
};

function generateToken(user) {
  // check user and return
  if (!user) {
    return null;
  }

  // generate a user id and authenticate
  var payload = {
    userInfo: user.id
  };

  // return token and user information with a refresh token
  var options = {
    expiresIn: '6h'
  };

  return jwt.sign(payload, SECRET, options);
}

function getAuthenticatedResponse(user) {
  if (!user) {
    return null;
  }

  return {
    user: user,
    token: generateToken(user)
  };
}

function validateToken(authToken) {
  var authPayload;
  return Q.promise(function (resolve, reject) {
    // validate the token
    try {
      authPayload = jwt.verify(authToken.split(" ")[1], SECRET);
    } catch (err) {
      sails.log.error('AuthenticationService#validateToken :: Error while ' +
        'verifying the token :: ', err);

        return reject({
          error: 'Error in validating'
        });
    }

    // check if payload is an object
    if ((authPayload == 'undefined') || !authPayload) {
      sails.log.error('AuthenticationService#validateToke :: Unidentified ' +
        'payload :: ', authPayload);

        return reject({
          error: 'Invalid authentication for user!'
        });
    }
    var userId = authPayload.userInfo;
    // get user for id
    User
      .findOne({id : userId})
      .then(resolve)
      .catch(function (err) {
        sails.log.error('AuthenticationService#validateToken :: Error :: ', err);
        // throw a 401 error
        return reject({
          error: 'Invalid authentication for user!'
        });
      });
  });
}

'use strict';

// policies/canWrite.js
module.exports = function (req, res, next) {
  var authToken = req.headers['authorization'];
  if (authToken == undefined) {
    var err = {
      message: 'User authentication error'
    };

    return res.json({
      err : err
    });
  }
  AuthenticationService
    .validateToken(authToken)
    .then(function (user) {
      // set user in the request
      req.user = user;

      return next();
    }, function (err) {
      sails.log.error('#IsUserAuthenticated :: Error while validating the ' +
        'token :: ', err);

      return res.json({
        err : err
      });
    });
};

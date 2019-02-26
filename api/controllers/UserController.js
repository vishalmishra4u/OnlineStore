/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  signUp : signUp,
  login : login,
  getUserOrders : getUserOrders
};

function signUp(req, res){
  var body = req.body;

  User
  .signUp(body)
  .then(function(user){
    res.json({
      user : user.user,
    });
  })
  .catch(function(error){
    res.json({
      error : error
    })
  });
}

function login(req, res){
  var loginData = {
    emailId : req.query.emailId,
    password : req.query.password
  };

  User
    .getForEmailPassword(loginData)
    .then(function (user) {
      var data = {
        id : user.id,
        name : user.name,
        emailId : user.emailId,
        address : user.address,
        mobileNumber : user.mobileNumber
      };

      var authenticatedResponse = AuthenticationService.getAuthenticatedResponse(user);
      var customerUser = {
        id : user.id,
        name : user.name,
        emailId : user.emailId,
        address : user.address,
        mobileNumber : user.mobileNumber
      };
      res.json({
        user : customerUser,
        token : authenticatedResponse.token
      });
    })
    .catch(function (error) {
      sails.log.error('UserController#login :: Login error :: ', err);
      return res.json({
        error : error
      });
    });
}

function getUserOrders(req, res){
  var userId = req.param.id;
  Order
    .getUserOrders(userId)
    .then(function(userOrders){
      res.json({
        orders : userOrders
      });
    })
    .catch(function(error){
      sails.log.error('UserController#getUserOrders :: get user orders error :: ', err);
      return res.json({
        error : error
      });
    });
}

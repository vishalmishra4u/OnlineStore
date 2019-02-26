/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  placeOrder : placeOrder,
  updateOrderLocation : updateOrderLocation,
  getOrderLocation : getOrderLocation
};

function placeOrder(req, res){
  var orderDetails = req.body;
  orderDetails.user = req.user;
  Order
    .placeOrder(orderDetails)
    .then(function(order){
      res.json({
        order : order
      });
    })
    .catch(function(error){
      res.json({
        error : error
      });
    });
}

function updateOrderLocation(req, res){
  var location = {
    lat : req.body.lat,
    long : req.body.long
  };
  Order
    .updateOrderLocation(location, req.body.id)
    .then(function(){
      res.json({
        message : 'success'
      });
    })
    .catch(function(error){
      res.json({
        error : error
      });
    });
}

function getOrderLocation(req, res){
  Order
    .findOne({
      id : req.query.id
    })
    .then(function(order){
      res.json({
        location : order.location
      });
    })
    .catch(function(error){
      res.json({
        error : error
      });
    });
}

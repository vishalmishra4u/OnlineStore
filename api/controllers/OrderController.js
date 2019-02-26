/**
 * OrderController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  placeOrder : placeOrder

};

function placeOrder(req, res){
  var orderDetails = req.body;
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

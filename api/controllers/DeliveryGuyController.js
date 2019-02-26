/**
 * DeliveryGuyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createDeliveryGuy : createDeliveryGuy
};

function createDeliveryGuy(req, res){
  DeliveryGuy
    .createDeliveryGuy(req.body)
    .then(function(deliveryGuy){
      res.json({
        deliveryGuy : deliveryGuy
      });
    })
    .catch(function(error){
      console.log('DeliveryGuyController :: error : ', error);
      res.json({
        error : error
      });
    })
}

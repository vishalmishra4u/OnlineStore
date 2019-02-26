/**
 * Order.js
 */

var Q = require('q');

module.exports = {

  attributes: {
    user: {
      model: 'user'
    },
    productQuantity: {
      type: 'json',
      columnType: 'array'
    },
    totalPrice: {
      type: 'number'
    },
    deliveryGuy: {
      model: 'deliveryGuy'
    },
    orderTime: {
      type: 'ref',
      columnType: 'datetime'
    },
    status: {
      type: 'string',
      isIn: ['placed', 'cancelled', 'in-transit', 'delivered']
    },
    location : {
      type : 'json'
    }
  },
  placeOrder: placeOrder,
  getUserOrders: getUserOrders,
  updateOrderLocation : updateOrderLocation
};

function placeOrder(orderDetails) {
  return Q.promise(function(resolve, reject) {
    var productQuantity = JSON.parse(orderDetails.productQuantity);

    var totalPrice = 0;

    productQuantity.forEach(function(product){
      totalPrice += product.price * product.quantity;
    });

    var newOrder = {
      user: orderDetails.user.id,
      productQuantity: productQuantity,
      totalPrice: totalPrice,
      deliveryGuy: null,
      orderTime: Date.now(),
      status: 'placed'
    };

    DeliveryGuy.find({
        isAvailable: true
      })
      .then(function(availableDeliveryGuys) {
        if (availableDeliveryGuys.length > 0) {
          availableDeliveryGuy = availableDeliveryGuys[0];

          newOrder.deliveryGuy = availableDeliveryGuy.id;
          DeliveryGuy
            .update({
              id: newOrder.deliveryGuy
            })
            .set({
              isAvailable: false
            })
            .then()
            .catch(function(error) {
              console.log('Order :: Error in updating delivery guy');
              return reject(error);
            });

          Order
            .create(newOrder)
            .fetch()
            .then(function(order) {
              return resolve(order);
            })
            .catch(function(error) {
              console.log('Order :: Error in creating order');
              return reject(error);
            });
        }
        else{
          return reject({
            message : 'No delivery guy available'
          });
        }
      })
      .catch(function(error) {
        console.log('Order :: Error in getting delivery guys');
        return reject(error);
      });
  });
}

function getUserOrders(userId) {
  return Q.promise(function(resolve, reject) {
    Order
      .find({
        user: userId
      })
      .then(function(userOrders) {
        var allOrders = [];
        userOrders.forEach(function(order) {
          var orders = {
            productQuantity: userOrders.productQuantity,
            totalPrice: userOrders.totalPrice,
            deliveryGuy: userOrders.deliveryGuy,
            orderTime: userOrders.orderTime
          };
          allOrders.push(orders);
        });

        return resolve(allOrders);
      })
      .catch(function(error) {
        console.log('order : Error in getting user orders');
        return reject(error);
      });
  });
}

function updateOrderLocation(orderCoordinates, orderId){
  return Q.promise(function(resolve, reject) {
    var coordinates = [];
    coordinates.push(orderCoordinates.lat,orderCoordinates.long)
    var update = {
      location : {
        type : 'Point',
        coordinates : coordinates
      }};
    order
      .update({id : orderId})
      .set(update)
      .then(function(){
        return resolve();
      })
      .catch(function(error){
        return reject(error);
      });
  });
}

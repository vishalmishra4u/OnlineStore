/**
 * Order.js
*/

var Q = require('q');

module.exports = {

  attributes: {
    user : {
      model : 'user'
    },
    productQuantity : {
      type: 'json',
      columnType: 'array'
    },
    totalPrice : {
      type : 'number'
    },
    deliveryGuy : {
      model : 'deliveryGuy'
    },
    orderTime : {
      type: 'ref',
      columnType: 'datetime'
    }
  },
  placeOrder : placeOrder,
  getUserOrders : getUserOrders
};

function placeOrder(orderDetails){
  return Q.promise(function(resolve, reject){
    var getTotalPrice = getTotalPrice(orderDetails.productQuantity);
    var newOrder = {
      user : orederDetails.user,
      productQuantity : orderDetails.productQuantity,
      totalPrice : totalPrice,
      deliveryGuy : null,
      orderTime : Date.now()
    };

    DeliveryGuy.find({
      isAvailable : true
    })
    .then(function(availableDeliveryGuys){
      if(availableDeliveryGuys.length > 0){
        availableDeliveryGuy = availableDeliveryGuys[0];

        newOrder.deliveryGuy = availableDeliveryGuy.id;
        DeliveryGuy
          .update({id : newOrder.deliveryGuy})
          .set({isAvailable : false})
          .then()
          .catch(function(error){
            console.log('Order :: Error in updating delivery guy');
            return reject(error);
          });

        Order
          .create(newOrder)
          .then(function(order){
            return resolve(order);
          })
          .catch(function(error){
            console.log('Order :: Error in creating order');
            return reject(error);
          });
      }
    })
    .catch(function(error){
      console.log('Order :: Error in getting delivery guys');
      return reject(error);
    });
  });
}

function getTotalPrice(productQuantity){
  return Q.promise(function(resolve, reject) {
    var totalPrice = 0;
    orderDetails.productQuantity.forEach(function(product){
      Product.getProductPrice(product.productId)
      .then(function(price){
        totalPrice += price;
      })
      .catch(function(error){
        return reject(error);
      });
    });
  });
}

function getUserOrders(userId){
  return Q.promise(function(resolve, reject){
    Order
      .find({user : userId})
      .then(function(userOrders){
        var allOrders = [];
        userOrders.forEach(function(order){
          var orders = {
            productQuantity : userOrders.productQuantity,
            totalPrice : userOrders.totalPrice,
            deliveryGuy : userOrders.deliveryGuy,
            orderTime : userOrders.orderTime
          };
          allOrders.push(orders);
        });

        return resolve(allOrders);
      })
      .catch(function(error){
        console.log('order : Error in getting user orders');
        return reject(error);
      });
  });
}

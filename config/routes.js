/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  '/': {
    view: 'pages/homepage'
  },

  //Customer(user) routes
  'POST /user/signUp' : {
    controller : 'UserController',
    action : 'signUp'
  },
  'GET /user/login' : {
    controller : 'UserController',
    action : 'login'
  },
  'GET /user/getuserOrders' : {
    controller : 'UserController',
    action : 'getUserOrders'
  },

  //Store routes
  'POST /store/create' : {
    controller : 'StoreController',
    action : 'createStore'
  },
  'PUT /store/update' : {
    controller : 'StoreController',
    action : 'updateStore'
  },
  'GET /store/getStore' : {
    controller : 'StoreController',
    action : 'getStore'
  },
  'DELETE /store/deleteStore' : {
    controller : 'StoreController',
    action : 'deleteStore'
  },
  'GET /store/getStoreProducts' : {
    controller : 'StoreController',
    action : 'getStoreProducts'
  },

  //Product routes
  'POST /product/createProduct' : {
    controller : 'ProductController',
    action : 'createProduct'
  },
  'PUT /product/updateProduct' : {
    controller : 'ProductController',
    action : 'updateProduct'
  },
  'GET /product/getProduct' : {
    controller : 'ProductController',
    action : 'getProduct'
  },
  'DELETE /product/deleteProduct' : {
    controller : 'ProductController',
    action : 'deleteProduct'
  },

  //Order routes
  'POST /order/placeOrder' : {
    controller : 'OrderController',
    action : 'placeOrder'
  },

  //Delivery guy routes
  'POST /deliveryGuy/createDeliveryGuy' : {
    controller : 'DeliveryGuyController',
    action : 'createDeliveryGuy'
  },

  //Order tracking
  'PUT /order/updateOrderLocation' : {
    controller : 'OrderController',
    action : 'updateOrderLocation'
  },
  'GET /order/getOrderLocation' : {
    controller : 'OrderController',
    action : 'getOrderLocation'
  }

};

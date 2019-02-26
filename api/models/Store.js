/**
 * Store.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var Q = require('q');

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    address : {
      type : 'string',
      required : true
    },
    products : {
      collection : 'product',
      via : 'store'
    },
    deliveryGuys : {
      collection : 'deliveryGuy',
      via : 'store'
    }
  },
  createStore : createStore,
  updateStore : updateStore,
  getStoreProducts : getStoreProducts
};

function createStore(storeDetails){
  return Q.promise(function(resolve, reject){
    var store = {
      name : storeDetails.name,
      address : storeDetails.address
    };

    Store
      .create(store)
      .fetch()
      .then(function(newStore){
        return resolve(newStore);
      })
      .catch(function(error){
        return reject(error);
      });
  });
}

function updateStore(storeDetails){
  return Q.promise(function(resolve, reject){
    Store
    .findOne({id : storeDetails.id})
    .then(function(store){
      Store
        .update({id : storeDetails.id})
        .set({
          name : storeDetails.name || store.name,
          address : storeDetails.address || store.address
        })
        .fetch()
        .then(function(store){
          return resolve(store[0]);
        })
        .catch(function(error){
          return reject(error);
        });
    })
    .catch(function(error){
      return reject(error);
    });
  });
}

function getStoreProducts(storeId){
  return Q.promise(function(resolve, reject){
    Product
      .find({id : storeId})
      .then(function(products){
        var allProducts = [];
        products.forEach(function(product){
          var productDetail = {
            productId : product.productId,
            productName : product.productName,
            price : product.price
          };

          allProducts.push(productDetail);
        });

        return resolve(allProducts);
      })
      .catch(function(error){
        return reject(error);
      });
  });
}

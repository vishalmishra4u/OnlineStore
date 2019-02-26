/**
 * Product.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var Q = require('q');

module.exports = {

  attributes: {
    productId: {
      type: 'string',
      required: true
    },
    productName : {
      type: 'string',
      required: true
    },
    price : {
      type : 'number',
      required : true
    },
    store : {
      model : 'store'
    }
  },
  createProduct : createProduct,
  updateProduct : updateProduct,
  getProductPrice : getProductPrice
};

function createProduct(productDetails){
  return Q.promise(function(resolve, reject) {
    var product = {
      productId : productDetails.productId,
      productName : productDetails.productName,
      price : productDetails.price,
      store : productDetails.store
    };

    Product
      .create(product)
      .fetch()
      .then(function(product){
        return resolve(product);
      })
      .catch(function(error){
        return reject(error);
      });
  });
}

function updateProduct(productDetails){
  return Q.promise(function(resolve, reject) {
    Product
      .update({id : productDetails.id})
      .set({
        productId : productDetails.productId,
        productName : productDetails.productName,
        price : productDetails.price
      })
      .fetch()
      .then(function(product){
        return resolve(product);
      })
      .catch(function(error){
        return reject(error);
      });
  });
}

function getProductPrice(productId){
  return Q.promise(function(resolve, reject){
    Product
      .findOne({id : productId})
      .then(function(product){
        return resolve(product.price);
      })
      .catch(function(error){
        return reject(error);
      });
  });
}

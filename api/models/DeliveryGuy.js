/**
 * DeliveryGuy.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
var Q = require('q');

module.exports = {

  attributes: {
    govtIdProof : {
      type : 'string'
    },
    proofNumber : {
      type : 'string',
      required : true
    },
    totalDeliveries : {
      type : 'number',
      defaultsTo : 0
    },
    avgRating : {
      type : 'number',
      defaultsTo : 0
    },
    user : {
      model : 'user'
    },
    store : {
      model : 'store'
    },
    orders : {
      collection : 'order',
      via : 'deliveryGuy'
    },
    isAvailable : {
      type : 'boolean',
      defaultsTo : true
    }
  },
  createDeliveryGuy : createDeliveryGuy
};

function createDeliveryGuy(deliveryGuyDetails){
  return Q.promise(function(resolve, reject) {
    var details = {
      govtIdProof : deliveryGuyDetails.govtIdProof,
      proofNumber : deliveryGuyDetails.proofNumber,
      user : deliveryGuyDetails.user,
      store : deliveryGuyDetails.store
    };

    DeliveryGuy
      .create(details)
      .fetch()
      .then(function(deliveryGuy){
        return resolve(deliveryGuy);
      })
      .catch(function(error){
        return reject(error);
      });
  });
}

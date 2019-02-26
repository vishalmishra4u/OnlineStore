/**
 * DeliveryGuy.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

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
      type : 'number'
    },
    avgRating : {
      type : 'number'
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

};

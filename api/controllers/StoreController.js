  /**
 * StoreController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createStore : createStore,
  updateStore : updateStore,
  getStore : getStore,
  deleteStore : deleteStore,
  getStoreProducts : getStoreProducts
};

function createStore(req, res){
  var storeDetails = req.body;

  Store
    .createStore(storeDetails)
    .then(function(store){
      res.json({
        store : store
      });
    })
    .catch(function(error){
      res.json({
        error : error
      });
    });
}

function updateStore(req, res){
  var storeDetails = req.body;

  Store
    .updateStore(storeDetails)
    .then(function(store){
      res.json({
        store : store
      });
    })
    .catch(function(error){
      res.json({
        error : error
      });
    });
}

function getStore(req, res){
  var storeId = req.param.id;

  Store
    .findOne({
      id : storeId
    })
    .then(function(store){
      res.json({
        store : store
      });
    })
    .catch(function(error){
      res.json({
        error : error
      });
    });
}

function deleteStore(req, res){
  var storeId = req.body.id;

  Store
    .destroyOne({
      id : storeId
    })
    .then(function(store){
      res.json({
        message : 'Store deleted successfully.'
      });
    })
    .catch(function(error){
      res.json({
        error : error
      });
    });
}

function getStoreProducts(req, res){
  var storeId = req.param.id;

  Store
    .getStoreProducts(storeId)
    .then(function(products){
      res.json({
        products : products
      });
    })
    .catch(function(error){
      res.json({
        error : error
      });
    });
}

/**
 * ProductController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  createProduct : createProduct,
  updateProduct : updateProduct,
  getProduct : getProduct,
  deleteProduct : deleteProduct
};

function createProduct(req, res){
  var productDetails = req.body;
  Product
    .createProduct(productDetails)
    .then(function(product){
      res.json({
        product : product
      });
    })
    .catch(function(error){
      res.json({
        error : error
      });
    });
}

function updateProduct(req, res){
  var productDetails = req.body;
  Product
    .updateProduct(productDetails)
    .then(function(product){
      res.json({
        product : product
      });
    })
    .catch(function(error){
      res.json({
        error : error
      });
    });
}

function getProduct(req, res){
  Product
    .findOne({id : req.param.id})
    .then(function(product){
      res.json({
        product : product
      });
    })
    .catch(function(error){
      res.json({
        error : error
      });
    });
}

function deleteProduct(req, res){
  Product
    .destroy({id : req.param.id})
    .then(function(){
      res.json({
        message : 'Product deleted successfully'
      });
    })
    .catch(function(error){
      res.json({
        error : error
      });
    });
}

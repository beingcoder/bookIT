'use strict';

/* Services */

var bookItServices = angular.module('bookItServices', ['ngResource']);

bookItServices.factory('Product', ['$resource',
  function($resource){
    return $resource('products/:productId.json', {}, {
      query: {method:'GET', params:{productId:'products'}, isArray:true}
    });
  }]);

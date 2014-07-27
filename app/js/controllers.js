'use strict';

/* Controllers */

window.quantity = new Object();
window.cart = new Array();

var bookItControllers = angular.module('bookItControllers', []);

bookItControllers.controller('HomeCtrl', ['$scope', 'Product', function ($scope, Product) {
  $scope.products = Product.query();
  $scope.orderProp = 'price';
}]);

bookItControllers.controller('ProductCtrl', ['$scope', '$routeParams', 'Product',
  function($scope, $routeParams, Product) {
    $scope.product = Product.get({productId: parseInt($routeParams.product_id)});
    
    if($scope.quantity == "undefined" || $scope.quantity == null ){
      $scope.quantity = window.quantity;
    }

    $scope.tempQuantity = 0;
    
    $scope.calculatePrice = function (tempQuantity, price) {
      return tempQuantity*price;
    }

    $scope.addToCart = function (tempQuantity) {
      $scope.quantity[$scope.product.name] = tempQuantity;
      $scope.status_msg = "Item succesfully added to your cart.";
      $('#status').fadeIn('fast', function() {
        window.setTimeout(function () {
          $('#status').fadeOut('slow');
        }, 2000);
      });
    }
    window.quantity = $scope.quantity;
}]);




bookItControllers.controller('CartCtrl', ['$scope', 'Product', function ($scope, Product) {
  $scope.cart = [];
  $scope.quantity = window.quantity;
  console.log($scope.quantity);
  $scope.products = Product.query(function  (products) {
    $scope.products = products;
    console.log("length: "+$scope.products.length);
    for (var i = 0; i < $scope.products.length; i++) {
      if(window.quantity[$scope.products[i].name] != undefined){
        $scope.products[i].quantity = window.quantity[$scope.products[i].name];
        console.log($scope.products[i].quantity);
        console.log(window.quantity[$scope.products[i].name]);
        $scope.cart.push($scope.products[i]);
      }
    };
  });
  console.log($scope.quantity);
  $scope.calculateTotal = function () {
    var total =  0;
    for (var i = 0; i < $scope.cart.length; i++) {
      console.log($scope.cart[i].price);
      console.log($scope.cart[i].quantity);
      total += parseInt($scope.cart[i].price)*parseFloat($scope.cart[i].quantity);
    };
    return total;
  }
  $scope.removeItemFromCart = function (productName) {
    console.log($scope.cart);
    for (var i = 0; i < $scope.cart.length; i++) {
      if($scope.cart[i].name == productName){
        $scope.cart.splice(i,1);
      }
    };
  }

  window.cart = $scope.cart;
}]);

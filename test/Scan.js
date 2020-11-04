const assert = require('assert');
let Product = artifacts.require("./Product.sol");

contract("Scan",function(){
    let productInstance;
    it("initializes with proper Product Address",function(accounts){
        return Product.deployed().then(function(instance){
            productInstance = instance;
            return productInstance;
        })
    })
});
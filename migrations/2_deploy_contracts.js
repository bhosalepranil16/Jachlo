const Product = artifacts.require("Product");

module.exports = function (deployer) {
  deployer.deploy(Product,"Pranil Pharma","Covid-19 Vaccine");
};

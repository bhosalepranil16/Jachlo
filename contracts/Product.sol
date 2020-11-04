// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Product {
    
    struct Stage {
        string name;
        string participant;
        string image;
        uint recordedAt;
        string lat;
        string lon;
    }
    
    string public COMPANY;                                     // Name of company
    string public PRODUCT;                                      // Name of product
    
    uint public productsCount;                                  // to track count of products
    uint[10000] public stageCount;                              // use for tracking no. of stages of each product
    
    Stage[10][10000] public stages;                             // main stages array
    
    address manufacturer;                                       // Manufacturer of Product

    mapping (uint => address) owners;                           // Owners array
    
    constructor(string memory _company, string memory _product) public {
        COMPANY = _company;
        PRODUCT = _product;
        manufacturer = msg.sender;
    }
    
    modifier onlyManufacturer {
        require(msg.sender == manufacturer);
        _;
    }
        
    event CreateProduct(uint _productsCount);
    
    event Sent(address _from, address _to, uint _productId);
    
    function createProduct(string memory _name, string memory _participant, string memory _image,string memory lat, string memory lon) public onlyManufacturer returns(uint) {
        stages[productsCount][stageCount[productsCount]] = Stage(_name, _participant,_image,block.timestamp,lat,lon);
        stageCount[productsCount]++;
        uint cnt = productsCount;
        productsCount++;
        emit CreateProduct(cnt);
        owners[cnt] = msg.sender;
        return cnt;
    }
        
    function send(uint _productId, string memory _name, string memory _participant, string memory _image,string memory _lat,string memory _lon,address _owner) public {
        require(_productId >= 0 && _productId < productsCount,"Invalid Product Id");
        require(owners[_productId] == msg.sender, "Invalid Owner");
        Stage memory temp = Stage(_name,_participant,_image,block.timestamp,_lat,_lon);
        stages[_productId][stageCount[_productId]] = temp;
        stageCount[_productId]++;
        emit Sent(owners[_productId],_owner,_productId);
        owners[_productId] = _owner;
    }
}
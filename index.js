const crypto = require('crypto');

//Constructor for Block
function Block(
    index, 
    previousHash, 
    data, 
    timestamp = Date.now()
    ) 
{
    this.index = index;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.calculateHash();
}

// Method to calculate the hash of the block
Block.prototype.calculateHash = function() {
    return crypto
        .createHash('sha256')
        .update(
            this.index 
            + this.previousHash 
            + this.timestamp 
            + JSON.stringify(this.data))
        .digest('hex');    
}

// Constructor for Blockchain
function Blockchain() {
    this.chain = [this.createGenesisBlock()];
}

// Method to create the GenesisBlock
Blockchain.prototype.createGenesisBlock = function() {
    return new Block(0, "0", "Genesis Block");
}

// Method to call the last block of the chain
Blockchain.prototype.getLatestBlock = function() {
    return this.chain[this.chain.length -1];
}

// Method to add a new block on the chain
Blockchain.prototype.addBlock = function(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
}

// Method to validate the blocks of chain
Blockchain.prototype.isChainValid = function(){
    
}
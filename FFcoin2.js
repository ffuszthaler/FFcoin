const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index; // block height, distance from genesis block
    this.timestamp = timestamp;
    this.data = data; // transactions
    this.previousHash = previousHash; // to allow chaining
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.timestamp +
        JSON.stringify(this.data) +
        this.previousHash
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      ///
    }
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "24062025", "Genesis Block", "0"); // first block of chain
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]; // latest item (block) in chain
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash; // chaining inside the blockchain
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

// testing
let FFcoin = new Blockchain();
FFcoin.addBlock(new Block(1, "24062025", { amount: 5 }));
FFcoin.addBlock(new Block(2, "24062025", { amount: 9 }));
FFcoin.addBlock(new Block(3, "24062025", { amount: 13 }));

console.log(JSON.stringify(FFcoin, null, 4));
console.log("Is my blockchain valid? " + FFcoin.isChainValid());

console.log();
console.log("HACK! change amount...");
FFcoin.chain[2].data = { amount: 100 };
FFcoin.chain[2].hash = FFcoin.chain[2].calculateHash();

console.log(JSON.stringify(FFcoin, null, 4));
console.log("Is my blockchain valid? " + FFcoin.isChainValid());

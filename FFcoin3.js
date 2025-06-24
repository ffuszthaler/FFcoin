const SHA256 = require("crypto-js/sha256");

class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash; // to allow chaining
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(
      this.timestamp +
        JSON.stringify(this.transactions) +
        this.previousHash +
        this.nonce
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++; // prevents infinite loop
      this.hash = this.calculateHash();
    }
    console.log("BLOCK MINED: " + this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
    this.pendingTransactions = []; // mempool
    this.miningReward = 50;
  }

  createGenesisBlock() {
    return new Block(0, "24062025", "Genesis Block", "0"); // first block of chain
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1]; // latest item (block) in chain
  }

  minePendingTransactions(miningRewardAddress) {
    let block = new Block(
      Date.now(),
      this.pendingTransactions,
      this.getLatestBlock().hash
    );
    block.mineBlock(this.difficulty);

    console.log("Block mined successfully!");
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward), // reward transaction
    ];
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceOfAddress(address) {
    let balance = 0;
    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }
        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }
    return balance;
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

FFcoin.createTransaction(new Transaction("address1", "address2", 20));
FFcoin.createTransaction(new Transaction("address2", "address1", 4));
console.log("Balance of address1: ", FFcoin.getBalanceOfAddress("address1"));
console.log("Balance of address2: ", FFcoin.getBalanceOfAddress("address2"));
console.log();

console.log("Mining Block 1 ...");
FFcoin.minePendingTransactions("florian-reward-address");
console.log();
console.log("Balance of address1: ", FFcoin.getBalanceOfAddress("address1"));
console.log("Balance of address2: ", FFcoin.getBalanceOfAddress("address2"));
console.log(
  "Balance of florian-reward-address: ",
  FFcoin.getBalanceOfAddress("florian-reward-address")
);
console.log();

console.log("Mining Block 2 ...");
FFcoin.minePendingTransactions("florian-reward-address");
console.log();
console.log("Balance of address1: ", FFcoin.getBalanceOfAddress("address1"));
console.log("Balance of address2: ", FFcoin.getBalanceOfAddress("address2"));
console.log(
  "Balance of florian-reward-address: ",
  FFcoin.getBalanceOfAddress("florian-reward-address")
);

console.log(JSON.stringify(FFcoin, null, 4));
console.log("Is my blockchain valid? " + FFcoin.isChainValid());

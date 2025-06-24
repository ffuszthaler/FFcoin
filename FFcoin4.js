const { Blockchain, Transaction } = require("./blockchain");

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

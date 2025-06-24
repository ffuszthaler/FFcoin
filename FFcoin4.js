const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate(
  "9030fc5594faedbaafce713f7e8bef78bcf1ce80bf669b52cc97d5485cce0d53"
);
const myWalletAddress = myKey.getPublic("hex");

let FFcoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, "receiver-address", 15);
tx1.signTransaction(myKey);
FFcoin.addTransaction(tx1);

console.log(
  "Balance of myWalletAddress: ",
  FFcoin.getBalanceOfAddress(myWalletAddress)
);
console.log("Mining Block 1 ...");
FFcoin.minePendingTransactions(myWalletAddress);

console.log(
  "Balance of myWalletAddress: ",
  FFcoin.getBalanceOfAddress(myWalletAddress)
);
console.log();

console.log(JSON.stringify(FFcoin, null, 4));

console.log("Mining Block 2 ...");
FFcoin.minePendingTransactions(myWalletAddress);

console.log(
  "Balance of myWalletAddress: ",
  FFcoin.getBalanceOfAddress(myWalletAddress)
);
console.log();

console.log("Is my blockchain valid? " + FFcoin.isChainValid());

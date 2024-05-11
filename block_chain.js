const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previous_hash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previous_hash = previous_hash;
    this.hash = this.calculate_hash();
  }

  calculate_hash() {
    return SHA256(
      this.index +
        this.previous_hash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class block_chain {
  constructor() {
    this.chain = [this.create_starting_block()];
  }

  create_starting_block() {
    return new Block(0, "10/05/2024", "First Block", "0");
  }

  get_latest_block() {
    return this.chain[this.chain.length - 1];
  }

  add_block(new_block) {
    new_block.previous_hash = this.get_latest_block().hash;
    new_block.hash = new_block.calculate_hash();
    this.chain.push(new_block);
  }

  // check validity of whole chain
  check_valid() {
    for (let i = 1; i < this.chain.length; i++) {
      const current_block = this.chain[i];
      const previous_block = this.chain[i - 1];

      if (current_block.hash != current_block.calculate_hash()) {
        return false;
      }

      if (current_block.previous_hash != previous_block.hash) {
        return false;
      }
    }

    return true;
  }
}

// sample block
let coin = new block_chain();
coin.add_block(new Block(1, "10/05/2024", { amount: 4 }));
coin.add_block(new Block(2, "10/05/2024", { amount: 10 }));

// console.log(JSON.stringify(coin, null, 4));

// console.log("Is chain valid? " + coin.check_valid());

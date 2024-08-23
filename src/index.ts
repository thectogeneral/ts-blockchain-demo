import Block from './block';  // Assuming Block is exported from Block.ts
import Transaction from './utils';  // Assuming Transaction is defined and exported from utils.ts

// Example transaction (you can customize this as per your needs)
const transaction: Transaction = {
    from: 'sender-address',
    to: 'recipient-address',
    amount: 100,
};
// Create a new block
const newBlock = new Block(transaction, 'previous-block-hash');

// Set a mining difficulty (e.g., 3 leading zeros)
const difficulty = 3;

// Mine the block
newBlock.mine(difficulty);

// Log the details of the mined block
console.log('Block mined:');
console.log('Hash:', newBlock.hash);
console.log('Previous Hash:', newBlock.previousHash);
console.log('Timestamp:', newBlock.timestamp);
console.log('Proof of Work:', newBlock.pow);
console.log('Data:', newBlock.data);

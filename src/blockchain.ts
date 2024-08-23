import Transaction, { calculateHash } from "./utils";
import Block from "./block";


class Blockchain {
    startBlock: Block;
    chain: Array<Block>;
    difficulty: number;
    constructor(startBlock: Block, chain: Array<Block>, difficulty: number) {
      this.startBlock = startBlock;
      this.chain = chain;
      this.difficulty = difficulty;
    }

    static create(difficulty: number): Blockchain {
        const startBlock: Block = new Block(null, undefined);
        return new Blockchain(startBlock, [startBlock], difficulty)
    }

}

export default Blockchain; 
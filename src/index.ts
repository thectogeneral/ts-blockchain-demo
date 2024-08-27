const readlineSync = require("readline-sync");
import color from "./lib/colors";
import Block from "../src/block";
import Blockchain from "../src/blockchain";

const usage = `${color.fg.green}
 ____________________________________________________________________________________________________________
|                                                                                                            |
|  ${color.blink}HOW TO USE:-${color.reset}${color.fg.green}                                                                                                   |
|  > add sender_name receiver_name transfer_amount  # adds a block to blockchain with the given data         |
|  > show                                           # shows the list of blocks available in the blockchain   |
|  > tamper block_number                            # tampers with the block giver by the number             |
|  > check                                          # validates the blockchain                               |
|  > help                                           # show this message                                      |
|  > exit                                            # close the program                                      |
|____________________________________________________________________________________________________________|

${color.reset}`;

let input: string;
console.log(usage);

const blockchain = Blockchain.create(2);

const format = (chain: Array<Block>, limit: number) => {
    let string = "";
    const isLongList = chain.length > limit;
    const newChain = chain.slice(isLongList ? chain.length - limit : 0);
    newChain.forEach((block, index) => {
      if (index == 0 && !isLongList) return;
      string += `\n${color.fg.yellow}[${index + (isLongList ? 1 : 0)}]${
        color.reset
      }\t${color.fg.magenta}Sender:${color.reset} ${block.data?.from}\t${
        color.fg.magenta
      }Receiver:${color.reset} ${block.data?.to}\t${color.fg.magenta}Amount:${
        color.reset
      } ${block.data?.amount}`;
    });
    return string || `${color.fg.yellow}Nothing to show :(${color.reset}`;
  };

function add(command: string[]) {
    if (command.length !== 4) {
        console.log(color.fg.red, `WRONG NUMBER OF ARGUMENTS!`, color.reset);
      }
      const amount = parseFloat(command[3]);
      if (isNaN(amount)) {
        console.log(color.fg.red, `Please give a correct Amount`, color.reset);

      }

    blockchain.addBlock(command[1], command[2], amount)
}

function show(outputLimit: number) {
    console.log(format(blockchain.chain, outputLimit))
}

function check() {
    console.log(
        blockchain.isValid()
          ? `${color.fg.yellow}The Blockchain is valid :)`
          : `${color.fg.red}[CRITICAL] The Blockchain is compromised :(`,
        color.reset
      );
}

function help() {
    console.log(usage)
}

function tamper(command: string[], outputLimit: number) {
    if (command.length !== 2) {
        console.log(color.fg.red, "WRONG NUMBER OF ARGUMENTS :(", color.reset);
      }
    const block_index = parseInt(command[1]);
    if (block_index < 1 || block_index > outputLimit) {
        console.log(color.fg.red, "WRONG INDEX FOR BLOCK", color.reset);
    }
    const chainLength = blockchain.chain.length;
    const changeIndex = block_index + (chainLength > outputLimit ? chainLength - outputLimit - 1 : 0);
    blockchain.chain[changeIndex].timestamp = new Date();
}

do {
    input = readlineSync.question(`${color.dim}> ${color.reset}`);
    const commands = input.split(" ")
    const command = commands[0]
    const outputLimit = 10

    if(command === "add"){
        add(commands)
    }else if(command === "help"){
        help()
    }else if(command === "tamper"){
        tamper(commands, outputLimit)
    }else if (command === "show"){
        show(outputLimit)
    }else if (command === "check"){
        check()
    }else if (command === "exit"){
        console.log(color.fg.cyan, "OK, GOODBYE! :(", color.reset);
    }else (
        console.log("Cannot process command")
    )

} while (input !== "exit");
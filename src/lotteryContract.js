import web3 from './web3';

const lotteryContractAddress = '0xB9c8F2F355902b86184ff185E27F5Eb4D0A7D213';

const lotteryContractABI = [
    {
        "constant":true,
        "inputs":[],
        "name":"manager",
        "outputs":[{"name":"","type":"address"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[],
        "name":"pickWinner",
        "outputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[],"name":"getPlayers",
        "outputs":[{"name":"","type":"address[]"}],
        "payable":false,"stateMutability":"view",
        "type":"function"
    },
    {
        "constant":false,
        "inputs":[],
        "name":"enter","outputs":[],
        "payable":true,"stateMutability":"payable",
        "type":"function"
    },
    {
        "constant":true,
        "inputs":[{"name":"","type":"uint256"}],
        "name":"players","outputs":[{"name":"","type":"address"}],
        "payable":false,
        "stateMutability":"view",
        "type":"function"
    },
    {
        "inputs":[],
        "payable":false,
        "stateMutability":"nonpayable",
        "type":"constructor"
    }
];

export default new web3.eth.Contract(lotteryContractABI, lotteryContractAddress);

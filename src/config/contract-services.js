import Splitter from '../../build/contracts/Splitter.json'
import getWeb3 from '../utils/getWeb3'
import Web3 from 'web3';


export const initWeb3 = async () => {
    var web3 = window.web3
    console.log('Injected web3 detected.');
    var provider = new Web3.providers.HttpProvider('http://127.0.0.1:8545')
    web3 = new Web3(provider)

    return web3;
}

export const getContract = async (_web3) => {
    const contract = require('truffle-contract')
    const simpleStorage = contract(Splitter)
    simpleStorage.setProvider(_web3.currentProvider)
    var simpleStorageInstance = await simpleStorage.deployed();
    return simpleStorageInstance;
}
export const getAccounts = (_web3) => {
    //  _web3.eth.getAccounts(function (err, res) {return (res);});

    return new Promise((resolve, reject) => _web3.eth.getAccounts((err, res) => resolve(res)))
}


export const payFunct = async (contractInstance, count, sender) => {
    await contractInstance.payMoney({from: sender, value: count});
};
export const splitFunct = async (contractInstance, sender) => {
    contractInstance.split({from: sender, gas: 3500000});
};
//
export const getContractBalance = async (contractInstance) => {
    var balance = await contractInstance.getContractBalance();
    return balance.toString();
};
export const getFirstAddr = async (contractInstance,sender) => {
    var addr = await contractInstance.getFirstAddr({from: sender});
    return addr;
};
export const getSecAcc = async (contractInstance,sender) => {
    var addr = await contractInstance.getSecondAddr({from: sender});
    return addr.toString();
};
export const getThirdAcc = async (contractInstance,sender) => {
    var addr = await contractInstance.getThirdAddr({from: sender});
    return addr.toString();
};
export const getFirstAddrBal = async (contractInstance) => {
    var res = await contractInstance.getFirstAddrBal.call();
  return res.toString();
};
export const getSecondAddrBal = async (contractInstance) => {
    var res = await contractInstance.getSecondAddrBal.call();
    return res.toString();
};
export const getThirdAddrBal= async (contractInstance) => {
    var res = await contractInstance.getThirdAddrBal.call();
    return res.toString();};


export const destroyContract = async (contractInstance,sender) => {
    await contractInstance.destroy({from:sender });

};


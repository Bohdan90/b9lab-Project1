pragma solidity ^0.4.4;

contract NaiveSplitter {
  address public recipient1;
  address public recipient2;
  mapping(address => uint) private ownedMoney;

  constructor (address first, address second){
    require(first != 0 && second != 0);
    recipient1 = first;
    recipient2 = second;
  }

  function sendMoney() public {
    require(recipient1 == msg.sender || recipient2 == msg.sender);
    require(ownedMoney [msg.sender] > 0);
    msg.sender.transfer(ownedMoney[msg.sender]);
  }

  function splitFunds() public payable returns (bool success) {
    require(msg.value > 0);
    uint256 amount = msg.value / 2;
    ownedMoney [recipient1] += amount;
    ownedMoney [recipient2] += amount;
    return true;
  }
}
pragma solidity ^0.4.0;
contract TestContract {
    uint256 public a;
    bytes32 public b;
    int256 public c;
    uint256 public d;
    
    function TestContract(uint256 arg0, bytes32 arg1) public {
        a = arg0;
        b = arg1;
    }
    function callFunction0(uint256 arg0) pure public returns (uint256 output0){
        return arg0;
    }
    function callFunction1(uint256 arg0, bytes32 arg1) pure public returns (uint256 output0, bytes32 output1){
        return (arg0, arg1);
    }
    function sendFunction0(uint256 arg0) public {
        a = arg0;
    }
    function sendFunction1(int256 arg0, int256 arg1) public returns (bool) {
        c = arg0 + arg1;
        return true;
    }
    function overloadedFunction(uint256 arg0) pure public returns (uint256) {
        return arg0;
    }
    function overloadedFunction(uint256 arg0, uint256 arg1) public returns (uint256) {
        d = arg0 + arg1;
        return d;
    }
}
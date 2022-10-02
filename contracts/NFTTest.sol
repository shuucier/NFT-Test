// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";

contract NFT is ERC721, Ownable, ERC721Holder{

    bool public status;
    uint256 public totalSupply;
    uint256 public maxSupply;
    constructor() ERC721("Gibbon Squad", "GIS") {
        status = true;
        totalSupply = 0;
        maxSupply = 1000;
    }

    function flipStatus() external onlyOwner {
        status = !status;
    }

    function mint(uint256 _amount) external{
        require(status == true, "Contract paused");
        require(_amount + totalSupply <= 1000, "All NFT minted");

        for(uint i = 0; i < _amount; i++) {
            uint index = totalSupply;
            _safeMint(msg.sender, index);
            totalSupply +=1;
        }
    }

    function burn(uint256 _tokenId) external{
        _burn(_tokenId);
    }


}

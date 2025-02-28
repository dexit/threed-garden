// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// learn more: https://docs.openzeppelin.com/contracts/3.x/erc721

// GET LISTED ON OPENSEA: https://testnets.opensea.io/get-listed/step-two

contract ThreeDNFT is ERC721, ERC721URIStorage, Ownable {
  //
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;

  constructor() ERC721("ThreeDNFT", "THREEDNFT") {
    //
  }

  function _baseURI() internal view virtual override returns (string memory) {
    //
    return "https://ipfs.io/ipfs/";
  }

  function _beforeTokenTransfer(
    address from,
    address to,
    uint256 tokenId
  ) internal {
    //
    super._beforeTokenTransfer(from, to, tokenId, tokenId);
    // super._beforeTokenTransfer(from, to, "0x53D29D43b5CDdB64b5991f548A89546988250F71");
  }

  function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
    //
    super._burn(tokenId);
    //super._burn("0x53D29D43b5CDdB64b5991f548A89546988250F71");
  }

  function supportsInterface(bytes4 interfaceId) public view override(ERC721) returns (bool) {
    return super.supportsInterface(interfaceId);
  }

  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    //
    // 🌱 DO SOMETHING
    //

    return super.tokenURI(tokenId);
    // return super.tokenURI("0x53D29D43b5CDdB64b5991f548A89546988250F71");
  }

  function mintItem(address to, string memory tokenURI) public returns (uint256) {
    //
    _tokenIds.increment();

    uint256 id = _tokenIds.current();
    _mint(to, id);
    _setTokenURI(id, tokenURI);
    // _setTokenURI(id, "0x53D29D43b5CDdB64b5991f548A89546988250F71");

    return id;
  }
}

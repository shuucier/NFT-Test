const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function loadDeploy() {

    // Contracts are deployed using the first signer/account by default
    const [owner, addr1] = await ethers.getSigners();

    const NFT = await ethers.getContractFactory("NFT");
    const nft = await NFT.deploy();

    return { nft, owner, addr1 };
  }

  describe("Testing features", function () {
    it("Mint", async function () {
      const { nft, owner, addr1 } = await loadFixture(loadDeploy);
      await nft.connect(owner).mint(10);
      expect(await nft.balanceOf(owner.address)).to.equal(10);
    });

    it("Burn", async function () {
      const { nft, owner, addr1 } = await loadFixture(loadDeploy);
      await nft.connect(owner).mint(10);
      expect(await nft.balanceOf(owner.address)).to.equal(10);

      await nft.connect(owner).burn(0);

      expect(await nft.totalSupply()).to.equal(10);
    });

    it("Pause", async function () {
      const { nft, owner, addr1 } = await loadFixture(loadDeploy);
      await nft.connect(owner).mint(10);
      expect(await nft.balanceOf(owner.address)).to.equal(10);

      await nft.connect(owner).flipStatus();

      expect(await nft.status()).to.equal(false)
      // expect(await nft.connect(owner).mint(10)).to.be.reverted;
    });
  });
});

const { expect, assert } = require('chai');
const { BN } = require('@openzeppelin/test-helpers');

describe('OrderFiller', function () {
  before(async function () {
    this.OrderFiller = await ethers.getContractFactory("OrderFiller");
    this.Token = await ethers.getContractFactory("TestERC20");
  });

  beforeEach(async function () {
    this.token0 = await this.Token.deploy("Test Token 0", "TEST0");
    await this.token0.deployed();
    this.token1 = await this.Token.deploy("Test Token 1", "TEST1");
    await this.token1.deployed();
    this.orderFiller = await this.OrderFiller.deploy(this.token0.address, this.token1.address);
    await this.orderFiller.deployed();

    this.startsWithToken0 = await ethers.provider.getSigner(0);
    this.startsWithToken1 = await ethers.provider.getSigner(1);
    this.token0Supply = (new BN(10)).pow(new BN(17));
    this.token1Supply = (new BN(10)).pow(new BN(18));

    await this.token0.mint(await this.startsWithToken0.getAddress(), this.token0Supply.toString());
    await this.token1.mint(await this.startsWithToken1.getAddress(), this.token1Supply.toString());
  });

  it("Should start with the right amounts in each wallet", async function () {
    expect((await this.token0.balanceOf(await this.startsWithToken0.getAddress())).toString()).to.equal(this.token0Supply.toString());
    expect((await this.token1.balanceOf(await this.startsWithToken1.getAddress())).toString()).to.equal(this.token1Supply.toString());
  });

  it("Should give the proper message hash", async function () {
    let expiration = await ethers.provider.getBlockNumber() + 10;

    let hashData = ethers.utils.solidityPack(
      ["address", "uint256", "uint256", "bool", "uint256", "uint256"],
      [await this.startsWithToken0.getAddress(), this.token0Supply.toString(), this.token1Supply.toString(), true, expiration, 0]
    );

    let hashSol = await this.orderFiller.getMessageHash(await this.startsWithToken0.getAddress(), this.token0Supply.toString(), this.token1Supply.toString(), true, expiration, 0);
    let hash = ethers.utils.keccak256(hashData);

    expect(hash).to.equal(hashSol);
  });

  it("Should fail when the signature is expired", async function () {
    let expiration = await ethers.provider.getBlockNumber() + 2;

    let hash = await this.orderFiller.getMessageHash(await this.startsWithToken0.getAddress(), this.token0Supply.toString(), this.token1Supply.toString(), true, expiration, 0);

    await this.token0.connect(this.startsWithToken0).approve(this.orderFiller.address, this.token0Supply.toString());
    await this.token1.connect(this.startsWithToken1).approve(this.orderFiller.address, this.token1Supply.toString());

    let signedHash = ethers.utils.arrayify(await this.startsWithToken1.signMessage(ethers.utils.arrayify(hash)));
    let sig = ethers.utils.splitSignature(signedHash);

    let r = sig.r;
    let s = sig.s;
    let v = sig.v;

    // based on https://ethereum.stackexchange.com/a/99480
    await new Promise((resolve, reject) => {
      ethers.provider.on("block", async (blockNumber) => {
        if (blockNumber == expiration + 1) {
          resolve();
        } else {
          await this.startsWithToken0.sendTransaction({ to: await this.startsWithToken1.getAddress(), value: 1 });
        }
      });
    });

    try {
      await this.orderFiller.connect(this.startsWithToken0).buy(
        v, r, s, await this.startsWithToken1.getAddress(),
        await this.startsWithToken0.getAddress(), this.token0Supply.toString(), this.token1Supply.toString(), expiration, 0
      );
    } catch (e) {
      expect(e.message.endsWith("Signature is expired")).to.equal(true);
    }
  });

  it('Should properly work in the buying direction', async function () {
    let expiration = await ethers.provider.getBlockNumber() + 10;

    let hash = await this.orderFiller.getMessageHash(await this.startsWithToken0.getAddress(), this.token0Supply.toString(), this.token1Supply.toString(), true, expiration, 0);

    await this.token0.connect(this.startsWithToken0).approve(this.orderFiller.address, this.token0Supply.toString());
    await this.token1.connect(this.startsWithToken1).approve(this.orderFiller.address, this.token1Supply.toString());

    let signedHash = ethers.utils.arrayify(await this.startsWithToken1.signMessage(ethers.utils.arrayify(hash)));
    let sig = ethers.utils.splitSignature(signedHash);

    let r = sig.r;
    let s = sig.s;
    let v = sig.v;

    let params = [
      v, r, s, await this.startsWithToken1.getAddress(),
      await this.startsWithToken0.getAddress(), this.token0Supply.toString(), this.token1Supply.toString(), expiration, 0
    ];

    console.log(`Gas estimate for buy(): ${(await ethers.provider.estimateGas({
      from: await this.startsWithToken0.getAddress(),
      to: this.orderFiller.address,
      data: this.OrderFiller.interface.encodeFunctionData('buy', params)
    })).toString()}`);

    await this.orderFiller.connect(this.startsWithToken0).buy(...params);

    expect((await this.token0.balanceOf(await this.startsWithToken0.getAddress())).toString()).to.equal('0');
    expect((await this.token1.balanceOf(await this.startsWithToken0.getAddress())).toString()).to.equal(this.token1Supply.toString());
    expect((await this.token0.balanceOf(await this.startsWithToken1.getAddress())).toString()).to.equal(this.token0Supply.toString());
    expect((await this.token1.balanceOf(await this.startsWithToken1.getAddress())).toString()).to.equal('0');
  });

  it('Should properly work in the selling direction', async function () {
    let expiration = await ethers.provider.getBlockNumber() + 10;

    let hash = await this.orderFiller.getMessageHash(await this.startsWithToken1.getAddress(), this.token1Supply.toString(), this.token0Supply.toString(), false, expiration, 0);

    await this.token0.connect(this.startsWithToken0).approve(this.orderFiller.address, this.token0Supply.toString());
    await this.token1.connect(this.startsWithToken1).approve(this.orderFiller.address, this.token1Supply.toString());

    let signedHash = ethers.utils.arrayify(await this.startsWithToken0.signMessage(ethers.utils.arrayify(hash)));
    let sig = ethers.utils.splitSignature(signedHash);

    let r = sig.r;
    let s = sig.s;
    let v = sig.v;

    let params = [
      v, r, s, await this.startsWithToken0.getAddress(),
      await this.startsWithToken1.getAddress(), this.token1Supply.toString(), this.token0Supply.toString(), expiration, 0
    ];

    console.log(`Gas estimate for sell(): ${(await ethers.provider.estimateGas({
      from: await this.startsWithToken1.getAddress(),
      to: this.orderFiller.address,
      data: this.OrderFiller.interface.encodeFunctionData('sell', params)
    })).toString()}`);

    await this.orderFiller.connect(this.startsWithToken1).sell(...params);

    expect((await this.token0.balanceOf(await this.startsWithToken0.getAddress())).toString()).to.equal('0');
    expect((await this.token1.balanceOf(await this.startsWithToken0.getAddress())).toString()).to.equal(this.token1Supply.toString());
    expect((await this.token0.balanceOf(await this.startsWithToken1.getAddress())).toString()).to.equal(this.token0Supply.toString());
    expect((await this.token1.balanceOf(await this.startsWithToken1.getAddress())).toString()).to.equal('0');
  });
});

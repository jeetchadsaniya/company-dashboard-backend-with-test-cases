const { expect } = require("chai");
const {
  Given,
  When,
  Then,
  Before,
  After,
  BeforeAll,
  AfterAll,
} = require("@cucumber/cucumber");
const sinon = require("sinon");
const sandbox = sinon.createSandbox();
const makeCreateSubProductUseCase = require("./create-sub-product-use-case");
const CustomError = require("../../utils/custom-error");

const subProductDb = {
  getSubProductByChannelIdAndProductId: () => {},
  getSubProductByProductNameAndCompanyId: () => {},
  insertSubProduct: () => {},
};
const productDb = {
  getProductByProductIdAndCompanyId: () => {},
};
const channelDb = {
  getChannelByChannelIdAndCompanyId: () => {},
};

let getSubProductByChannelIdAndProductIdStub;
let getSubProductByProductNameAndCompanyIdStub;
let insertSubProductStub;
let getProductByProductIdAndCompanyIdStub;
let getChannelByChannelIdAndCompanyIdStub;

BeforeAll(() => {
  getSubProductByChannelIdAndProductIdStub = sandbox.stub(
    subProductDb,
    "getSubProductByChannelIdAndProductId"
  );
  getSubProductByProductNameAndCompanyIdStub = sandbox.stub(
    subProductDb,
    "getSubProductByProductNameAndCompanyId"
  );
  insertSubProductStub = sandbox.stub(subProductDb, "insertSubProduct");
  getProductByProductIdAndCompanyIdStub = sandbox.stub(
    productDb,
    "getProductByProductIdAndCompanyId"
  );
  getChannelByChannelIdAndCompanyIdStub = sandbox.stub(
    channelDb,
    "getChannelByChannelIdAndCompanyId"
  );
});

Before(() => {
  getChannelByChannelIdAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("channelId");
    expect(args).to.have.own.property("companyId");
    if (args.channelId === "2") {
      return false;
    }
    return true;
  });

  getProductByProductIdAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("productId");
    expect(args).to.have.own.property("companyId");
    if (args.productId === "2") {
      return false;
    }
    return true;
  });
  getSubProductByChannelIdAndProductIdStub.callsFake((args) => {
    expect(args).to.have.own.property("productId");
    expect(args).to.have.own.property("channelId");
    if (args.productId === "3") {
      return true;
    }
    return false;
  });
  getSubProductByProductNameAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("productName");
    expect(args).to.have.own.property("companyId");
    if (args.productName === "Product Two") {
      return true;
    }
    return false;
  });
  insertSubProductStub.callsFake((args) => {
    expect(args).to.have.own.property("productName");
    expect(args).to.have.own.property("description");
    expect(args).to.have.own.property("productId");
    expect(args).to.have.own.property("companyId");
    expect(args).to.have.own.property("channelId");
    return 5 ;
  });
});

After(() => {
  sandbox.resetHistory();
  this.productName = undefined;
  this.description = undefined;
  this.channelId = undefined;
  this.productId = undefined;
  this.companyId = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "productName : {string}, description : {string}, channelId : {string}, productId : {string}, companyId : {string} for create sub product",
  async (productName, description, channelId, productId, companyId) => {
    this.productName = productName;
    this.description = description;
    this.channelId = channelId;
    this.productId = productId;
    this.companyId = companyId;
  }
);

When("try to get result for create sub product", async () => {
  const createSubProductUseCase = makeCreateSubProductUseCase({
    channelDb,
    subProductDb,
    productDb,
    CustomError,
  });
  try {
    this.result = await createSubProductUseCase({
      productName: this.productName,
      description: this.description,
      channelId: this.channelId,
      productId: this.productId,
      companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for create sub product",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for create sub product",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

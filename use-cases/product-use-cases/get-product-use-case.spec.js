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
const makeGetProductUseCase = require("./get-product-use-case");
const CustomError = require("../../utils/custom-error");

const productDb = {
    getProductByProductIdAndCompanyId: () => {},
};
const channelDb = {
    getChannelByChannelCodeAndCompanyId: () => {},
};
const subProductDb = {
    getSubProductByChannelIdAndProductId: () => {},
};

let getProductByProductIdAndCompanyIdStub;
let getChannelByChannelCodeAndCompanyIdStub;
let getSubProductByChannelIdAndProductIdStub;

BeforeAll(() => {
    getProductByProductIdAndCompanyIdStub = sandbox.stub(
    productDb,
    "getProductByProductIdAndCompanyId"
  );
  getChannelByChannelCodeAndCompanyIdStub = sandbox.stub(
    channelDb,
    "getChannelByChannelCodeAndCompanyId"
  );
  getSubProductByChannelIdAndProductIdStub = sandbox.stub(
    subProductDb,
    "getSubProductByChannelIdAndProductId"
  );
});

Before(() => {
    getProductByProductIdAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("productId");
    expect(args).to.have.own.property("companyId");
    if (args.productId === '2') {
        return false;
    }
    return {productId : 1,price : 11,companyId :1};
  });
  getChannelByChannelCodeAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("channelCode");
    expect(args).to.have.own.property("companyId");
    return {channelId : 1};
  });
  getSubProductByChannelIdAndProductIdStub.callsFake((args) => {
    expect(args).to.have.own.property("productId");
    expect(args).to.have.own.property("channelId");
    return {productName : "Product One",description : "Good One"};
  });
});

After(() => {
  sandbox.resetHistory();
  this.productId = undefined;
  this.companyId = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "productId : {string},companyId : {string} for get product",
  async (productId,companyId) => {
    this.productId = productId;
    this.companyId = companyId;
  }
);

When("try to get result for get product", async () => {
  const getProductUseCase = makeGetProductUseCase({
    channelDb,
    productDb,
    subProductDb,
    CustomError,
  });
  try {
    this.result = await getProductUseCase({
        productId: this.productId,
        companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for get product",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for get product",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

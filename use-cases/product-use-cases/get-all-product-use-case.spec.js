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
const makeGetAllProductUseCase = require("./get-all-product-use-case");
const CustomError = require("../../utils/custom-error");

const productDb = {
  getAllProductByCompanyId: () => {},
};
const subProductDb = {
  getSubProductByChannelIdAndProductId: () => {},
};

const channelDb = {
  getChannelByChannelCodeAndCompanyId: () => {},
};

let getAllProductByCompanyIdStub;
let getSubProductByChannelIdAndProductIdStub;
let getChannelByChannelCodeAndCompanyIdStub;

BeforeAll(() => {
  getAllProductByCompanyIdStub = sandbox.stub(
    productDb,
    "getAllProductByCompanyId"
  );
  getSubProductByChannelIdAndProductIdStub = sandbox.stub(
    subProductDb,
    "getSubProductByChannelIdAndProductId"
  );
  getChannelByChannelCodeAndCompanyIdStub = sandbox.stub(
    channelDb,
    "getChannelByChannelCodeAndCompanyId"
  );
});

Before(() => {
  getAllProductByCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("companyId");
    expect(args).to.have.own.property("queryStringObj");
    return [{ productId: 1, price: 11, companyId: 1 }];
  });
  getChannelByChannelCodeAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("channelCode");
    expect(args).to.have.own.property("companyId");
    return { channelId: 1, companyId: 1 };
  });
  getSubProductByChannelIdAndProductIdStub.callsFake((args) => {
    expect(args).to.have.own.property("channelId");
    expect(args).to.have.own.property("productId");
    return { productName: "Product One", description: "Good Product" };
  });
});

After(() => {
  sandbox.resetHistory();
  this.queryStringObj = undefined;
  this.companyId = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "companyId : {string}, queryStringObj : {string} for get all product",
  async (companyId, queryStringObj) => {
    this.queryStringObj = queryStringObj;
    this.companyId = companyId;
  }
);

When("try to get result for get all product", async () => {
  const getAllProductUseCase = makeGetAllProductUseCase({
    channelDb,
    productDb,
    subProductDb,
    CustomError,
  });
  try {
    this.result = await getAllProductUseCase({
      queryStringObj: this.queryStringObj,
      companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for get all product",
  async (result) => {
    this.result = JSON.stringify(this.result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

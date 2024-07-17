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
const makeGetSubProductUseCase = require("./get-sub-product-use-case");
const CustomError = require("../../utils/custom-error");

const subProductDb = {
  getSubProductBySubProductIdAndCompanyId: () => {},
};

let getSubProductBySubProductIdAndCompanyIdStub;

BeforeAll(() => {
  getSubProductBySubProductIdAndCompanyIdStub = sandbox.stub(
    subProductDb,
    "getSubProductBySubProductIdAndCompanyId"
  );
});

Before(() => {
  getSubProductBySubProductIdAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("subProductId");
    expect(args).to.have.own.property("companyId");
    if (args.subProductId === "2") {
      return false;
    }
    return {
      subProductId: 1,
      productName: "Product One",
      channelId: "1",
      productId: 1,
      companyId: 1,
    };
  });
});

After(() => {
  sandbox.resetHistory();
  this.subProductId = undefined;
  this.companyId = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "subProductId : {string},companyId : {string} for get sub product",
  async (subProductId, companyId) => {
    this.subProductId = subProductId;
    this.companyId = companyId;
  }
);

When("try to get result for get sub product", async () => {
  const getSubProductUseCase = makeGetSubProductUseCase({
    subProductDb,
    CustomError,
  });
  try {
    this.result = await getSubProductUseCase({
      subProductId: this.subProductId,
      companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for get sub product",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for get sub product",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

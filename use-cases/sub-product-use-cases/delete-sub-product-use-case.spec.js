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
const makeDeleteSubProductUseCase = require("./delete-sub-product-use-case");
const CustomError = require("../../utils/custom-error");

const subProductDb = {
  getSubProductBySubProductIdAndCompanyId: () => {},
  deleteSubProduct: () => {},
};
const channelDb = {
  getChannelByChannelIdAndCompanyId: () => {},
};

let getSubProductBySubProductIdAndCompanyIdStub;
let deleteSubProductStub;
let getChannelByChannelIdAndCompanyIdStub;

BeforeAll(() => {
  getSubProductBySubProductIdAndCompanyIdStub = sandbox.stub(
    subProductDb,
    "getSubProductBySubProductIdAndCompanyId"
  );
  deleteSubProductStub = sandbox
    .stub(subProductDb, "deleteSubProduct")
    .returns(true);
  getChannelByChannelIdAndCompanyIdStub = sandbox.stub(
    channelDb,
    "getChannelByChannelIdAndCompanyId"
  );
});

Before(() => {
  getSubProductBySubProductIdAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("subProductId");
    expect(args).to.have.own.property("companyId");
    if (args.subProductId === "2") {
      return false;
    } else if (args.subProductId === "3") {
      return {
        subProductId: 1,
        productName: "Product One",
        channelId: "1",
        productId: 1,
        companyId: 1,
      };
    }
    return {
      subProductId: 1,
      productName: "Product One",
      channelId: "2",
      productId: 1,
      companyId: 1,
    };
  });
  getChannelByChannelIdAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("channelId");
    expect(args).to.have.own.property("companyId");
    if (args.channelId === "1") {
      return {channelId : 1,channelCode : "en"};
    } 
    return {channelId : 2,channelCode : "hi"};
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
  "subProductId : {string},companyId : {string} for delete sub product",
  async (subProductId, companyId) => {
    this.subProductId = subProductId;
    this.companyId = companyId;
  }
);

When("try to get result for delete sub product", async () => {
  const deleteSubProductUseCase = makeDeleteSubProductUseCase({
    subProductDb,
    channelDb,
    CustomError,
  });
  try {
    this.result = await deleteSubProductUseCase({
      subProductId: this.subProductId,
      companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for delete sub product",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for delete sub product",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

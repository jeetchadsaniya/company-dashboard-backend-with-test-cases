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
const makeUpdateSubProductUseCase = require("./update-sub-product-use-case");
const CustomError = require("../../utils/custom-error");

const subProductDb = {
  getSubProductBySubProductIdAndCompanyId: () => {},
  getSubProductByProductNameAndCompanyId: () => {},
  updateSubProduct: () => {},
};

let getSubProductBySubProductIdAndCompanyIdStub;
let getSubProductByProductNameAndCompanyIdStub;
let updateSubProductStub;

BeforeAll(() => {
  getSubProductBySubProductIdAndCompanyIdStub = sandbox.stub(
    subProductDb,
    "getSubProductBySubProductIdAndCompanyId"
  );
  getSubProductByProductNameAndCompanyIdStub = sandbox.stub(
    subProductDb,
    "getSubProductByProductNameAndCompanyId"
  );
  updateSubProductStub = sandbox
    .stub(subProductDb, "updateSubProduct")
    .returns(true);
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
      description: "Good Product",
      companyId : 1
    };
  });

  getSubProductByProductNameAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("productName");
    expect(args).to.have.own.property("companyId");
    if (args.productName === "Product Two") {
      return true;
    }
    return false;
  });
});

After(() => {
  sandbox.resetHistory();
  this.productName = undefined;
  this.description = undefined;
  this.subProductId = undefined;
  this.companyId = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "subProductId : {string}, productName : {string}, description : {string}, companyId : {string} for update sub product",
  async (subProductId, productName, description, companyId) => {
    this.productName = productName;
    this.description = description;
    this.subProductId = subProductId;
    this.companyId = companyId;
  }
);

When("try to get result for update sub product", async () => {
  const updateSubProductUseCase = makeUpdateSubProductUseCase({
    subProductDb,
    CustomError,
  });
  try {
    this.result = await updateSubProductUseCase({
      productName: this.productName,
      description: this.description,
      subProductId: this.subProductId,
      companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for update sub product",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for update sub product",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

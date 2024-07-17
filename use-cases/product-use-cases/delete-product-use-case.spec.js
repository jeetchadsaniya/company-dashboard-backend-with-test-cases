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
const makeDeleteProductUseCase = require("./delete-product-use-case");
const CustomError = require("../../utils/custom-error");

const productDb = {
    getProductByProductIdAndCompanyId: () => {},
    deleteProduct: () => {},
};

let getProductByProductIdAndCompanyIdStub;
let deleteProductStub;

BeforeAll(() => {
    getProductByProductIdAndCompanyIdStub = sandbox.stub(
    productDb,
    "getProductByProductIdAndCompanyId"
  );
  deleteProductStub = sandbox.stub(
    productDb,
    "deleteProduct"
  ).returns(true);
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
  "productId : {string},companyId : {string} for delete product",
  async (productId,companyId) => {
    this.productId = productId;
    this.companyId = companyId;
  }
);

When("try to get result for delete product", async () => {
  const deleteProductUseCase = makeDeleteProductUseCase({
    productDb,
    CustomError,
  });
  try {
    this.result = await deleteProductUseCase({
        productId: this.productId,
        companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for delete product",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for delete product",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

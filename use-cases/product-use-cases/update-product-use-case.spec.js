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
const makeUpdateProductUseCase = require("./update-product-use-case");
const CustomError = require("../../utils/custom-error");

const productDb = {
    getProductByProductIdAndCompanyId: () => {},
    updateProduct: () => {},
};

let getProductByProductIdAndCompanyIdStub;
let updateProductStub;
let uploadImageAndSendImageUrl;

BeforeAll(() => {
    getProductByProductIdAndCompanyIdStub = sandbox.stub(
        productDb,
    "getProductByProductIdAndCompanyId"
  );
  updateProductStub = sandbox.stub(
    productDb,
    "updateProduct"
  ).returns(true);
  uploadImageAndSendImageUrl = sandbox.stub().returns("abc.image.cloudinary.com");
});

Before(() => {
    getProductByProductIdAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("productId");
    expect(args).to.have.own.property("companyId");
    if (args.productId === "2") {
      return false;
    } 
    return {productId : 1,price : 11, imageUrl : "abc.image.cloudinary.com",companyId : 1};
  });
});

After(() => {
  sandbox.resetHistory();
  this.fields = undefined;
  this.files = undefined;
  this.productId = undefined;
  this.companyId = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "productId : {string}, fields : {string}, files : {string}, companyId : {string} for update product",
  async (productId,fields, files,companyId) => {
    this.fields = fields;
    this.fields = JSON.parse(this.fields);
    this.files = files;
    this.files = JSON.parse(this.files);
    this.companyId = companyId;
    this.productId = productId;
  }
);

When("try to get result for update product", async () => {
  const updateProductUseCase = makeUpdateProductUseCase({
    productDb,
    uploadImageAndSendImageUrl,
    CustomError,
  });
  try {
    this.result = await updateProductUseCase({
        productId: this.productId,
        fields: this.fields,
        files: this.files,
        companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for update product",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for update product",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

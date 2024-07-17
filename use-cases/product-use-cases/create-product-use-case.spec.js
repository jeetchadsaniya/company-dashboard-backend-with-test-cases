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
const makeCreateProductUseCase = require("./create-product-use-case");
const CustomError = require("../../utils/custom-error");

const productDb = {
    insertProduct: () => {},
};
const subProductDb = {
    getSubProductByProductNameAndCompanyId: () => {},
    insertSubProduct: () => {},
};
const channelDb = {
    getChannelByChannelCodeAndCompanyId: () => {},
};


let insertProductStub;
let getSubProductByProductNameAndCompanyIdStub;
let insertSubProductStub;
let getChannelByChannelCodeAndCompanyIdStub;
let uploadImageAndSendImageUrl;

BeforeAll(() => {
    insertProductStub = sandbox.stub(
    productDb,
    "insertProduct"
  );
  getSubProductByProductNameAndCompanyIdStub = sandbox.stub(
    subProductDb,
    "getSubProductByProductNameAndCompanyId"
  );
  insertSubProductStub = sandbox.stub(
    subProductDb,
    "insertSubProduct"
  );
  getChannelByChannelCodeAndCompanyIdStub = sandbox.stub(
    channelDb,
    "getChannelByChannelCodeAndCompanyId"
  );
  uploadImageAndSendImageUrl = sandbox.stub().returns("abc.image.cloudinary.com");
});

Before(() => {
    getSubProductByProductNameAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("productName");
    expect(args).to.have.own.property("companyId");
    if (args.productName === "Product Two") {
      return true;
    }
    return false;
  });

  insertProductStub.callsFake((args) => {
    expect(args).to.have.own.property("imageUrl");
    expect(args).to.have.own.property("price");
    expect(args).to.have.own.property("companyId");
    return 1;
  });

  getChannelByChannelCodeAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("channelCode");
    expect(args).to.have.own.property("companyId");
    return {channelId : 1};
  });
  insertSubProductStub.callsFake((args) => {
    expect(args).to.have.own.property("productName");
    expect(args).to.have.own.property("description");
    expect(args).to.have.own.property("productId");
    expect(args).to.have.own.property("channelId");
    expect(args).to.have.own.property("companyId");
    return 1;
  });
});

After(() => {
  sandbox.resetHistory();
  this.fields = undefined;
  this.files = undefined;
  this.companyId = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "fields : {string}, files : {string}, companyId : {string} for create product",
  async (fields, files,companyId) => {
    this.fields = fields;
    this.fields = JSON.parse(this.fields);
    this.files = files;
    this.files = JSON.parse(this.files);
    this.companyId = companyId;
  }
);

When("try to get result for create product", async () => {
  const createProductUseCase = makeCreateProductUseCase({
    channelDb,
    productDb,
    subProductDb,
    uploadImageAndSendImageUrl,
    CustomError,
  });
  try {
    this.result = await createProductUseCase({
        fields: this.fields,
        files: this.files,
        companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for create product",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for create product",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

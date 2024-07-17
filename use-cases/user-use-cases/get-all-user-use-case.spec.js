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
const makeGetAllUserUseCase = require("./get-all-user-use-case");
const CustomError = require("../../utils/custom-error");

const userDb = {
    getAllUserByCompanyId: () => {},
};

let getAllUserByCompanyIdStub;

BeforeAll(() => {
    getAllUserByCompanyIdStub = sandbox.stub(
    userDb,
    "getAllUserByCompanyId"
  );
});

Before(() => {
    getAllUserByCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("companyId");
    expect(args).to.have.own.property("queryStringObj");
    return [{userId :1 ,companyId : 1}];
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
  "companyId : {string}, queryStringObj : {string} for get all user",
  async (companyId, queryStringObj) => {
    this.queryStringObj = queryStringObj;
    this.companyId = companyId;
  }
);

When("try to get result for get all user", async () => {
  const getAllUserUseCase = makeGetAllUserUseCase({
    userDb,
    CustomError,
  });
  try {
    this.result = await getAllUserUseCase({
      queryStringObj: this.queryStringObj,
      companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for get all user",
  async (result) => {
    this.result = JSON.stringify(this.result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);
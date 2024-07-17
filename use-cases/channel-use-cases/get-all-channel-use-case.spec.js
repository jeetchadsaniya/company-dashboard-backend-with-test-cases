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
const makeGetAllChannelUseCase = require("./get-all-channel-use-case");
const CustomError = require("../../utils/custom-error");

const channelDb = {
  getAllChannelByCompanyId: () => {},
};

let getAllChannelByCompanyIdStub;

BeforeAll(() => {
  getAllChannelByCompanyIdStub = sandbox.stub(
    channelDb,
    "getAllChannelByCompanyId"
  );
});

Before(() => {
    getAllChannelByCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("companyId");
    expect(args).to.have.own.property("queryStringObj");
    return [{companyId : 1,channelId : 1,channelCode : "en", channelName : "english"}];
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
  "companyId : {string}, queryStringObj : {string} for get all channel",
  async (companyId, queryStringObj) => {
    this.queryStringObj = queryStringObj;
    this.companyId = companyId;
  }
);

When("try to get result for get all channel", async () => {
  const getAllChannelUseCase = makeGetAllChannelUseCase({
    channelDb,
    CustomError,
  });
  try {
    this.result = await getAllChannelUseCase({
      queryStringObj: this.queryStringObj,
      companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for get all channel",
  async (result) => {
    this.result = JSON.stringify(this.result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);
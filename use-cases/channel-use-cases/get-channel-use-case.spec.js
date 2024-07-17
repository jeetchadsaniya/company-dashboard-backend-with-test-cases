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
const makeGetChannelUseCase = require("./get-channel-use-case");
const CustomError = require("../../utils/custom-error");

const channelDb = {
    getChannelByChannelIdAndCompanyId: () => {},
};

let getChannelByChannelIdAndCompanyIdStub;

BeforeAll(() => {
    getChannelByChannelIdAndCompanyIdStub = sandbox.stub(
    channelDb,
    "getChannelByChannelIdAndCompanyId"
  );
});

Before(() => {
    getChannelByChannelIdAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("channelId");
    expect(args).to.have.own.property("companyId");
    if (args.channelId === '1') {
      return {channelId : 1, channelName : "english",channelCode : "en" ,companyId : 1};
    }
    return false;
  });
});

After(() => {
  sandbox.resetHistory();
  this.channelId = undefined;
  this.companyId = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "channelId : {string},companyId : {string} for get channel",
  async (channelId,companyId) => {
    this.channelId = channelId;
    this.companyId = companyId;
  }
);

When("try to get result for get channel", async () => {
  const getChannelUseCase = makeGetChannelUseCase({
    channelDb,
    CustomError,
  });
  try {
    this.result = await getChannelUseCase({
        channelId: this.channelId,
        companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for get channel",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for get channel",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

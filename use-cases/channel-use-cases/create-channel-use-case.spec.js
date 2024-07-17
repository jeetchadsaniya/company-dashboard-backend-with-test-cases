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
const makeCreateChannelUseCase = require("./create-channel-use-case");
const CustomError = require("../../utils/custom-error");

const channelDb = {
  getChannelByChannelCodeAndCompanyId: () => {},
  getChannelByChannelNameAndCompanyId: () => {},
  insertChannel: () => {},
};

let getChannelByChannelCodeAndCompanyIdStub;
let getChannelByChannelNameAndCompanyIdStub;
let insertChannelStub;

BeforeAll(() => {
  getChannelByChannelCodeAndCompanyIdStub = sandbox.stub(
    channelDb,
    "getChannelByChannelCodeAndCompanyId"
  );
  getChannelByChannelNameAndCompanyIdStub = sandbox.stub(
    channelDb,
    "getChannelByChannelNameAndCompanyId"
  );
  insertChannelStub = sandbox.stub(channelDb, "insertChannel").returns(1);
});

Before(() => {
    getChannelByChannelCodeAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("channelCode");
    expect(args).to.have.own.property("companyId");
    if (args.channelCode === "ma") {
      return true;
    }
    return false;
  });

  getChannelByChannelNameAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("channelName");
    expect(args).to.have.own.property("companyId");
    if (args.channelName === "gujrati") {
        return true;
    }
    return false;
  });
});

After(() => {
  sandbox.resetHistory();
  this.channelName = undefined;
  this.channelCode = undefined;
  this.companyId = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "channelName : {string}, channelCode : {string}, companyId : {string} for create channel",
  async (channelName, channelCode,companyId) => {
    this.channelName = channelName;
    this.channelCode = channelCode;
    this.companyId = companyId;
  }
);

When("try to get result for create channel", async () => {
  const createChannelUseCase = makeCreateChannelUseCase({
    channelDb,
    CustomError,
  });
  try {
    this.result = await createChannelUseCase({
        channelName: this.channelName,
        channelCode: this.channelCode,
        companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for create channel",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for create channel",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

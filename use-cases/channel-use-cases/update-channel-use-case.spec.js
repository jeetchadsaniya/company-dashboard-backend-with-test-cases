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
const makeUpdateChannelUseCase = require("./update-channel-use-case");
const CustomError = require("../../utils/custom-error");

const channelDb = {
    getChannelByChannelIdAndCompanyId: () => {},
  getChannelByChannelCodeAndCompanyId: () => {},
  getChannelByChannelNameAndCompanyId: () => {},
  updateChannel: () => {},
};

let getChannelByChannelIdAndCompanyIdStub;
let getChannelByChannelCodeAndCompanyIdStub;
let getChannelByChannelNameAndCompanyIdStub;
let updateChannelStub;

BeforeAll(() => {
    getChannelByChannelIdAndCompanyIdStub = sandbox.stub(
    channelDb,
    "getChannelByChannelIdAndCompanyId"
  );
  getChannelByChannelCodeAndCompanyIdStub = sandbox.stub(
    channelDb,
    "getChannelByChannelCodeAndCompanyId"
  );
  getChannelByChannelNameAndCompanyIdStub = sandbox.stub(
    channelDb,
    "getChannelByChannelNameAndCompanyId"
  );
  updateChannelStub = sandbox.stub(channelDb, "updateChannel").returns(true);
});

Before(() => {
    getChannelByChannelIdAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("channelId");
    expect(args).to.have.own.property("companyId");
    if (args.channelId === '3') {
      return false;
    } else if (args.channelId === '1') {
        return {channelCode : "en"}
    }
    return {channelId : 2,channelName : "gujrati", channelCode : "gu",companyId : 1};
  });

  getChannelByChannelCodeAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("channelCode");
    expect(args).to.have.own.property("companyId");
    if (args.channelCode === "hi") {
      return true;
    }
    return false;
  });

  getChannelByChannelNameAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("channelName");
    expect(args).to.have.own.property("companyId");
    if (args.channelName === "marathi") {
        return true;
    }
    return false;
  });
});

After(() => {
  sandbox.resetHistory();
  this.channelId = undefined;
  this.channelName = undefined;
  this.channelCode = undefined;
  this.companyId = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "channelId : {string}, channelName : {string}, channelCode : {string}, companyId : {string} for update channel",
  async (channelId,channelName, channelCode,companyId) => {
    this.channelId = channelId;
    this.channelName = channelName;
    this.channelCode = channelCode;
    this.companyId = companyId;
  }
);

When("try to get result for update channel", async () => {
  const updateChannelUseCase = makeUpdateChannelUseCase({
    channelDb,
    CustomError,
  });
  try {
    this.result = await updateChannelUseCase({
        channelId: this.channelId,
        channelName: this.channelName,
        channelCode: this.channelCode,
        companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for update channel",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for update channel",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

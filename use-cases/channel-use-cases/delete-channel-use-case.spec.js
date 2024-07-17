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
const makeDeleteChannelUseCase = require("./delete-channel-use-case");
const CustomError = require("../../utils/custom-error");

const channelDb = {
  getChannelByChannelIdAndCompanyId: () => {},
  deleteChannel: () => {},
};

let getChannelByChannelIdAndCompanyIdStub;
let deleteChannelStub;

BeforeAll(() => {
  getChannelByChannelIdAndCompanyIdStub = sandbox.stub(
    channelDb,
    "getChannelByChannelIdAndCompanyId"
  );
  deleteChannelStub = sandbox.stub(channelDb, "deleteChannel").returns(true);
});

Before(() => {
  getChannelByChannelIdAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("channelId");
    expect(args).to.have.own.property("companyId");
    if (args.channelId === "2") {
      return {
        channelId: 2,
        channelName: "hindi",
        channelCode: "hi",
        companyId: 1,
      };
    } else if (args.channelId === "1") {
      return { channelCode: "en" };
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
  "channelId : {string},companyId : {string} for delete channel",
  async (channelId, companyId) => {
    this.channelId = channelId;
    this.companyId = companyId;
  }
);

When("try to get result for delete channel", async () => {
  const deleteChannelUseCase = makeDeleteChannelUseCase({
    channelDb,
    CustomError,
  });
  try {
    this.result = await deleteChannelUseCase({
      channelId: this.channelId,
      companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for delete channel",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for delete channel",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

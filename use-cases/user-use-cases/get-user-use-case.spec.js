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
const makeGetUserUseCase = require("./get-user-use-case");
const CustomError = require("../../utils/custom-error");

const userDb = {
  getUserByUserIdAndCompanyId: () => {},
};
const permissionDb = {
    getPermissionByPermissionId: () => {},
};
const rollDb = {
    getRollByRollId: () => {},
};

let getUserByUserIdAndCompanyIdStub;
let getPermissionByPermissionIdStub;
let getRollByRollIdStub;

BeforeAll(() => {
    getUserByUserIdAndCompanyIdStub = sandbox.stub(
    userDb,
    "getUserByUserIdAndCompanyId"
  );
  getPermissionByPermissionIdStub = sandbox.stub(
    permissionDb,
    "getPermissionByPermissionId"
  );
  getRollByRollIdStub = sandbox.stub(rollDb, "getRollByRollId");
});

Before(() => {
    getUserByUserIdAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("userId");
    expect(args).to.have.own.property("companyId");
    if (args.userId === "2") {
      return false
    }
    return {userId : 1,rollId :64};
  });
  getPermissionByPermissionIdStub.callsFake((args) => {
    expect(args).to.have.own.property("permissionId");
    return {read :1,write :1,delete :1};
  });

  getRollByRollIdStub.callsFake((args) => {
    expect(args).to.have.own.property("rollId");
    return {channelPermissionId : 4,productPermissionId : 4, userPermissionId : 4};
  });
});

After(() => {
  sandbox.resetHistory();
  this.userId = undefined;
  this.companyId = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "userId : {string}, companyId : {string} for get user",
  async (userId, companyId) => {
    this.userId = userId;
    this.companyId = companyId;
  }
);

When("try to get result for get user", async () => {
  const getUserUseCase = makeGetUserUseCase({
    userDb,
    permissionDb,
    rollDb,
    CustomError,
  });
  try {
    this.result = await getUserUseCase({
        userId: this.userId,
      companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for get user",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then("it should return the error : {string} for get user", async (error) => {
  expect(this.error).to.be.equal(error);
});

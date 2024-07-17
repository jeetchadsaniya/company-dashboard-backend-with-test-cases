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
const makeDeleteUserUseCase = require("./delete-user-use-case");
const CustomError = require("../../utils/custom-error");

const userDb = {
    getUserByUserIdAndCompanyId: () => {},
    deleteUser: () => {},
};

let getUserByUserIdAndCompanyIdStub;
let deleteUserStub;

BeforeAll(() => {
    getUserByUserIdAndCompanyIdStub = sandbox.stub(
    userDb,
    "getUserByUserIdAndCompanyId"
  );
  deleteUserStub = sandbox.stub(
    userDb,
    "deleteUser"
  ).returns(true);
});

Before(() => {
    getUserByUserIdAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("userId");
    expect(args).to.have.own.property("companyId");
    if (args.userId === "2") {
      return false
    } else if (args.userId === '3') {
        return {userId : 3,createdBy : 3}
    }
    return {"userId":4,"createdBy":1,"companyId":1}
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
  "userId : {string}, companyId : {string} for delete user",
  async (userId, companyId) => {
    this.userId = userId;
    this.companyId = companyId;
  }
);

When("try to get result for delete user", async () => {
  const deleteUserUseCase = makeDeleteUserUseCase({
    userDb,
    CustomError,
  });
  try {
    this.result = await deleteUserUseCase({
        userId: this.userId,
      companyId: this.companyId,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for delete user",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then("it should return the error : {string} for delete user", async (error) => {
  expect(this.error).to.be.equal(error);
});

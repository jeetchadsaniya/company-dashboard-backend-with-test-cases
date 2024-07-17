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
const makeUpdateUserUseCase = require("./update-user-use-case");
const CustomError = require("../../utils/custom-error");

const userDb = {
  getUserByUserIdAndCompanyId: () => {},
  updateUserNameAndRollIdByUserId: () => {},
};
const permissionDb = {
  getPermissionByPermissions: () => {},
};
const rollDb = {
  getRollIdByPermissions: () => {},
};

let getUserByUserIdAndCompanyIdStub;
let updateUserNameAndRollIdByUserIdStub;
let getPermissionByPermissionsStub;
let getRollIdByPermissionsStub;

BeforeAll(() => {
  getUserByUserIdAndCompanyIdStub = sandbox.stub(
    userDb,
    "getUserByUserIdAndCompanyId"
  );
  updateUserNameAndRollIdByUserIdStub = sandbox
    .stub(userDb, "updateUserNameAndRollIdByUserId")
    .returns(true);
  getPermissionByPermissionsStub = sandbox.stub(
    permissionDb,
    "getPermissionByPermissions"
  );
  getRollIdByPermissionsStub = sandbox.stub(rollDb, "getRollIdByPermissions");
});

Before(() => {
  getUserByUserIdAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("userId");
    expect(args).to.have.own.property("companyId");
    if (args.userId === "2") {
      return false;
    } else if (args.userId === "3") {
      return { userId: 3, createdBy: 3 };
    }
    return {userId : 4,companyId : 1,userName : "jeet",rollId : 64};
  });

  getPermissionByPermissionsStub.callsFake((args) => {
    expect(args).to.have.own.property("read");
    expect(args).to.have.own.property("write");
    expect(args).to.have.own.property("delete");
    if (args.read === 0) {
      return false;
    }
    return { read :1,write :1,delete :1 };
  });

  getRollIdByPermissionsStub.callsFake((args) => {
    expect(args).to.have.own.property("channelPermissionId");
    expect(args).to.have.own.property("productPermissionId");
    expect(args).to.have.own.property("userPermissionId");
    return 64;
  });
});

After(() => {
  sandbox.resetHistory();
  this.userName = undefined;
  this.companyId = undefined;
  this.userId = undefined;
  this.roll = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "userName : {string}, companyId : {string}, userId : {string}, roll : {string} for update user",
  async (userName, companyId, userId, roll) => {
    this.userName = userName;
    this.companyId = companyId;
    this.userId = userId;
    this.roll = JSON.parse(roll);
  }
);

When("try to get result for update user", async () => {
  const updateUserUseCase = makeUpdateUserUseCase({
    userDb,
    permissionDb,
    rollDb,
    CustomError,
  });
  try {
    this.result = await updateUserUseCase({
      userName: this.userName,
      companyId: this.companyId,
      userId: this.userId,
      roll: this.roll,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for update user",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then("it should return the error : {string} for update user", async (error) => {
  expect(this.error).to.be.equal(error);
});

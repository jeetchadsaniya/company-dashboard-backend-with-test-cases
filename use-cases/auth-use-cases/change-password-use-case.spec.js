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
const makeChangePasswordUseCase = require("./change-password-use-case");
const CustomError = require("../../utils/custom-error");

const userDb = {
    getUserByUserId: () => {},
    setPassword: () => {},
};
const bcrypt = {
    hash: () => {},
};
const jwt = {
    verify: () => {},
};


let getUserByUserIdStub;
let setPasswordStub;
let hashStub;
let verifyStub;

BeforeAll(() => {
    getUserByUserIdStub = sandbox.stub(userDb, "getUserByUserId");
    setPasswordStub = sandbox.stub(userDb, "setPassword");
    hashStub = sandbox.stub(
        bcrypt,
    "hash"
  );
  verifyStub = sandbox.stub(jwt,"verify")
});

Before(() => {
    getUserByUserIdStub.callsFake((args) => {
    expect(args).to.have.own.property("userId");
    if (args.userId === 2) {
      return false;
    } else if (args.userId === 3) {
        return {isPasswordSet : 1}
    }
    return {userId : 1,isPasswordSet : 0};
  });

  setPasswordStub.callsFake((args) => {
    expect(args).to.have.own.property("password");
    expect(args).to.have.own.property("userId");
    expect(args).to.have.own.property("isPasswordSet");
    return true;
  });

  verifyStub.callsFake((accessToken,jwtSecret = "jeet") => {
    expect(accessToken).to.not.be.undefined;
    expect(jwtSecret).to.not.be.undefined;
    if (accessToken === "token") {
        return {userId : 1};
    } else if (accessToken === "token2") {
        return {userId : 2};
    } else if (accessToken === "token3") {
        return {userId : 3}
    } 
    throw new Error();
  });

  hashStub.callsFake((newPassword,numberOfCycle) => {
    expect(newPassword).to.not.be.undefined;
    expect(numberOfCycle).to.not.be.undefined;
    return "encryptPassword";
  })
});

After(() => {
  sandbox.resetHistory();
  this.accessToken = undefined;
  this.newPassword = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "accessToken : {string}, newPassword : {string} for change password",
  async (accessToken,newPassword) => {
    this.accessToken = accessToken;
    this.newPassword = newPassword;
  }
);

When("try to get result for change password", async () => {
  const changePasswordUseCase = makeChangePasswordUseCase({
    userDb,
    bcrypt,
    jwt,
    CustomError
  });
  try {
    this.result = await changePasswordUseCase({
        accessToken : this.accessToken,
        newPassword : this.newPassword,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then("it should return the result : {string} for change password", async (result) => {
  this.result = JSON.stringify(this.result);
  result = JSON.parse(result);
  result = JSON.stringify(result);
  expect(this.error).to.be.undefined;
  expect(this.result).to.be.equal(result);
});

Then('it should return the error : {string} for change password', async (error) => {
  expect(this.error).to.be.equal(error);
})

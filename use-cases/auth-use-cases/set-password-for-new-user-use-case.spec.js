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
const makeSetPasswordForNewUserUseCase = require("./set-password-for-new-user-use-case");
const CustomError = require("../../utils/custom-error");

const userDb = {
  getUserByUserId: () => {},
  setPassword : () => {},
  updateStatus : () => {},
};
const bcrypt = {
  hash: () => {},
};
const jwt = {
  verify: () => {},
};

let getUserByUserIdStub;
let hashStub;
let verifyStub;
let setPasswordStub;
let updateStatusStub;

BeforeAll(() => {
  getUserByUserIdStub = sandbox.stub(userDb, "getUserByUserId");
  hashStub = sandbox.stub(bcrypt, "hash");
  verifyStub = sandbox.stub(jwt, "verify");
  setPasswordStub = sandbox.stub(userDb, "setPassword").returns(true);
  updateStatusStub = sandbox.stub(userDb, "updateStatus").returns(true);
});

Before(() => {
  getUserByUserIdStub.callsFake((args) => {
    expect(args).to.have.own.property("userId");
    if (args.userId === 2) {
      return false;
    } else if (args.userId === 3) {
      return { isPasswordSet: 1 };
    }
    return { userId: 1, isPasswordSet: 0 };
  });

  verifyStub.callsFake((accessToken, jwtSecret = "jeet") => {
    expect(accessToken).to.not.be.undefined;
    expect(jwtSecret).to.not.be.undefined;
    if (accessToken === "token") {
      return { userId: 1 };
    } else if (accessToken === "token2") {
      return { userId: 2 };
    } else if (accessToken === "token3") {
      return { userId: 3 };
    }
    throw new Error();
  });

  hashStub.callsFake((password, numberOfCycle) => {
    expect(password).to.not.be.undefined;
    expect(numberOfCycle).to.not.be.undefined;
    return "encryptPassword";
  });
});

After(() => {
  sandbox.resetHistory();
  this.accessToken = undefined;
  this.password = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "accessToken : {string}, password : {string} for send password for new user",
  async (accessToken, password) => {
    this.accessToken = accessToken;
    this.password = password;
  }
);

When("try to get result for send password for new user", async () => {
  const setPasswordForNewUserUseCase = makeSetPasswordForNewUserUseCase({
    userDb,
    bcrypt,
    jwt,
    CustomError,
  });
  try {
    this.result = await setPasswordForNewUserUseCase({
      accessToken: this.accessToken,
      password: this.password,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for send password for new user",
  async (result) => {
    this.result = JSON.stringify(this.result);
    result = JSON.parse(result);
    result = JSON.stringify(result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for send password for new user",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

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
const makeCreateUserUseCase = require("./create-user-use-case");
const CustomError = require("../../utils/custom-error");

const userDb = {
  getUserByEmailAndCompanyId: () => {},
  insertUser: () => {},
};
const permissionDb = {
  getPermissionByPermissions: () => {},
};
const rollDb = {
  getRollIdByPermissions: () => {},
};
const jwt = {
  sign: () => {},
};

let getUserByEmailAndCompanyIdStub;
let insertUserStub;
let getPermissionByPermissionsStub;
let getRollIdByPermissionsStub;
let signStub;
let sendSetPasswordMailForNewUser;

BeforeAll(() => {
  getUserByEmailAndCompanyIdStub = sandbox.stub(
    userDb,
    "getUserByEmailAndCompanyId"
  );
  insertUserStub = sandbox.stub(userDb, "insertUser");
  getPermissionByPermissionsStub = sandbox.stub(
    permissionDb,
    "getPermissionByPermissions"
  );
  getRollIdByPermissionsStub = sandbox.stub(rollDb, "getRollIdByPermissions");
  signStub = sandbox.stub(jwt, "sign");
  sendSetPasswordMailForNewUser = sandbox.stub().returns(true);
});

Before(() => {
    getUserByEmailAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("email");
    expect(args).to.have.own.property("companyId");
    if (args.email === 'abc@gmail.com') {
      return true;
    }
    return false;
  });

  insertUserStub.callsFake((args) => {
    expect(args).to.have.own.property("companyId");
    expect(args).to.have.own.property("userName");
    expect(args).to.have.own.property("email");
    expect(args).to.have.own.property("password");
    expect(args).to.have.own.property("status");
    expect(args).to.have.own.property("isPasswordSet");
    expect(args).to.have.own.property("createdBy");
    expect(args).to.have.own.property("rollId");
    return "accessToken";
  });

  getPermissionByPermissionsStub.callsFake((args) => {
    expect(args).to.have.own.property("read");
    expect(args).to.have.own.property("write");
    expect(args).to.have.own.property("delete");
    if (args.read === 0) {
        return false
    }
    return {read : 1, write : 1, delete : 1};
  });

  getRollIdByPermissionsStub.callsFake((args) => {
    expect(args).to.have.own.property("channelPermissionId");
    expect(args).to.have.own.property("productPermissionId");
    expect(args).to.have.own.property("userPermissionId");
    return 64;
  });

  signStub.callsFake((data, jwtSecret = "jeet", expiresIn) => {
    expect(data).to.not.be.undefined;
    expect(jwtSecret).to.not.be.undefined;
    expect(expiresIn).to.not.be.undefined;
    return "accessToken";
  });
});

After(() => {
  sandbox.resetHistory();
  this.userName = undefined;
  this.email = undefined;
  this.companyId = undefined;
  this.userId = undefined;
  this.roll = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "userName : {string}, email : {string},companyId : {string}, userId : {string}, roll : {string} for create user",
  async (userName, email, companyId,userId,roll) => {
    this.userName = userName;
    this.email = email;
    this.companyId = companyId;
    this.userId = companyId;
    this.companyId = companyId;
    this.roll = JSON.parse(roll);
  }
);

When("try to get result for create user", async () => {
  const createUserUseCase = makeCreateUserUseCase({
    userDb,
    permissionDb,
    rollDb,
    jwt,
    sendSetPasswordMailForNewUser,
    CustomError,
  });
  try {
    this.result = await createUserUseCase({
        userName: this.userName,
      email: this.email,
      companyId: this.companyId,
      userId: this.userId,
      roll: this.roll,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then("it should return the result : {string} for create user", async (result) => {
  this.result = JSON.stringify(this.result);
  result = JSON.parse(result);
  result = JSON.stringify(result);
  expect(this.error).to.be.undefined;
  expect(this.result).to.be.equal(result);
});

Then("it should return the error : {string} for create user", async (error) => {
  expect(this.error).to.be.equal(error);
});

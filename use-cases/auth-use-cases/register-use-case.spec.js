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
const makeRegisterUseCase = require("./register-use-case");
const CustomError = require("../../utils/custom-error");
const bcrypt = require("bcryptjs");

const companyDb = {
  getCompanyByEmail: () => {},
  insertCompany: () => {},
};
const permissionDb = {
  getPermissionByPermissions: () => {},
};
const rollDb = {
  getRollIdByPermissions: () => {},
};
const userDb = {
  insertUser: () => {},
  updateCreatedBy: () => {},
};
const channelDb = {
  insertChannel: () => {},
};

let getCompanyByEmailStub;
let insertCompanyStub;
let getPermissionByPermissionsStub;
let getRollIdByPermissionsStub;
let insertUserStub;
let updateCreatedByStub;
let insertChannelStub;

BeforeAll(() => {
  getCompanyByEmailStub = sandbox.stub(companyDb, "getCompanyByEmail");
  insertCompanyStub = sandbox.stub(companyDb, "insertCompany");
  getPermissionByPermissionsStub = sandbox.stub(
    permissionDb,
    "getPermissionByPermissions"
  );
  getRollIdByPermissionsStub = sandbox.stub(rollDb, "getRollIdByPermissions");
  insertUserStub = sandbox.stub(userDb, "insertUser");
  updateCreatedByStub = sandbox.stub(userDb, "updateCreatedBy");
  insertChannelStub = sandbox.stub(channelDb, "insertChannel");
});

Before(() => {
  getCompanyByEmailStub.callsFake((args) => {
    expect(args).to.have.own.property("email");
    if (args.email === "tcs@gmail.com") {
      return true;
    }
    return false;
  });

  insertCompanyStub.callsFake((args) => {
    expect(args).to.have.own.property("companyName");
    expect(args).to.have.own.property("email");
    return 1;
  });

  getPermissionByPermissionsStub.callsFake((args) => {
    expect(args).to.have.own.property("read");
    expect(args).to.have.own.property("write");
    expect(args).to.have.own.property("delete");
    return { permissionId: 64 };
  });

  getRollIdByPermissionsStub.callsFake((args) => {
    expect(args).to.have.own.property("channelPermissionId");
    expect(args).to.have.own.property("productPermissionId");
    expect(args).to.have.own.property("userPermissionId");
    return 64;
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
    return 1;
  });

  updateCreatedByStub.callsFake((args) => {
    expect(args).to.have.own.property("createdBy");
    expect(args).to.have.own.property("userId");
    return true;
  });

  insertChannelStub.callsFake((args) => {
    expect(args).to.have.own.property("channelName");
    expect(args).to.have.own.property("channelCode");
    expect(args).to.have.own.property("companyId");
    return true;
  });
});

After(() => {
  sandbox.resetHistory();
  this.companyName = undefined;
  this.email = undefined;
  this.userName = undefined;
  this.password = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "companyName : {string}, email : {string}, userName : {string},password : {string} for register",
  async (companyName, email, userName, password) => {
    this.companyName = companyName;
    this.email = email;
    this.userName = userName;
    this.password = password;
  }
);

When("try to get result for register", async () => {
  const registerUseCase = makeRegisterUseCase({
    userDb,
    companyDb,
    channelDb,
    permissionDb,
    rollDb,
    bcrypt,
    CustomError,
  });
  try {
    this.result = await registerUseCase({
      companyName : this.companyName,
      email : this.email,
      userName : this.userName,
      password : this.password
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then("it should return the result : {string} for register", async (result) => {
  this.result = JSON.stringify(this.result);
  result = JSON.parse(result);
  result = JSON.stringify(result);
  expect(this.error).to.be.undefined;
  expect(this.result).to.be.equal(result);
});

Then('it should return the error : {string} for register', async (error) => {
  expect(this.error).to.be.equal(error);
})

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
const makeLoginUseCase = require("./login-use-case");
const CustomError = require("../../utils/custom-error");

const companyDb = {
    getCompanyByCompanyId: () => {},
};
const userDb = {
    getUserByEmailAndCompanyId: () => {},
    updateStatus: () => {},
};
const bcrypt = {
    compare: () => {},
};
const jwt = {
    sign: () => {},
};


let getCompanyByCompanyIdStub;
let getUserByEmailAndCompanyIdStub;
let updateStatusStub;
let signStub;
let compareStub;

BeforeAll(() => {
    getCompanyByCompanyIdStub = sandbox.stub(companyDb, "getCompanyByCompanyId");
    getUserByEmailAndCompanyIdStub = sandbox.stub(userDb, "getUserByEmailAndCompanyId");
    updateStatusStub = sandbox.stub(
    userDb,
    "updateStatus"
  );
  compareStub = sandbox.stub(bcrypt,"compare")
  signStub = sandbox.stub(jwt,"sign")
});

Before(() => {
    getCompanyByCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("companyId");
    if (args.companyId == 2) {
      return false;
    }
    return true;
  });

  getUserByEmailAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("companyId");
    expect(args).to.have.own.property("email");
    if (args.email === "abc@gmail.com") {
        return false
    } else if ( args.email === "abcd@gmail.com"){
        return {password : undefined}
    }
    return {userId : 1,password : "12345",isPasswordSet : 1,companyId :1,rollId : 64}
  });

  updateStatusStub.callsFake((args) => {
    expect(args).to.have.own.property("status");
    expect(args).to.have.own.property("userId");
    return true;
  });

  compareStub.callsFake((inputPassword,rightPassword) => {
    expect(rightPassword).to.not.be.undefined;
    expect(inputPassword).to.not.be.undefined;
    if (inputPassword === rightPassword) {
        return true
    }
    return false;
  })

  signStub.callsFake((data,jwtSecret = "jeet",expiresIn) => {
    expect(data).to.not.be.undefined;
    expect(jwtSecret).to.not.be.undefined;
    expect(expiresIn).to.not.be.undefined;
    return "encryptPassword";
  })
});

After(() => {
  sandbox.resetHistory();
  this.companyId = undefined;
  this.email = undefined;
  this.password = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "companyId : {string}, email : {string},password : {string} for login",
  async (companyId, email, password) => {
    this.companyId = companyId;
    this.email = email;
    this.password = password;
  }
);

When("try to get result for login", async () => {
  const loginUseCase = makeLoginUseCase({
    userDb,
    companyDb,
    bcrypt,
    jwt,
    CustomError
  });
  try {
    this.result = await loginUseCase({
        companyId : this.companyId,
      email : this.email,
      password : this.password
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then("it should return the result : {string} for login", async (result) => {
  this.result = JSON.stringify(this.result);
  result = JSON.parse(result);
  result = JSON.stringify(result);
  expect(this.error).to.be.undefined;
  expect(this.result).to.be.equal(result);
});

Then('it should return the error : {string} for login', async (error) => {
  expect(this.error).to.be.equal(error);
})

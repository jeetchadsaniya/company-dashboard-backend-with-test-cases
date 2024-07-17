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
const makeSendForgotPasswordMailUseCase = require("./send-forgot-password-mail-use-case");
const CustomError = require("../../utils/custom-error");

const companyDb = {
    getCompanyByCompanyId: () => {},
};
const userDb = {
    getUserByEmailAndCompanyId: () => {},
    changeIsPasswordSet: () => {},
};
const jwt = {
    sign: () => {},
};


let getCompanyByCompanyIdStub;
let getUserByEmailAndCompanyIdStub;
let changeIsPasswordSetStub;
let signStub;
let sendForgotPasswordMail;

BeforeAll(() => {
    getCompanyByCompanyIdStub = sandbox.stub(companyDb, "getCompanyByCompanyId");
    getUserByEmailAndCompanyIdStub = sandbox.stub(userDb, "getUserByEmailAndCompanyId");
    changeIsPasswordSetStub = sandbox.stub(userDb, "changeIsPasswordSet").returns(true);
    signStub = sandbox.stub(
        jwt,
    "sign"
  );
  sendForgotPasswordMail = sandbox.stub().returns(true);
});

Before(() => {
    getCompanyByCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("companyId");
    if (args.companyId === '2') {
      return false;
    } 
    return true;
  });

  getUserByEmailAndCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("companyId");
    expect(args).to.have.own.property("email");
    if (args.email === 'abc@gmail.com') {
        return false;
      } 
      return true;
  });

  signStub.callsFake((data,jwtSecret = "jeet",expiresIn) => {
    expect(data).to.not.be.undefined;
    expect(jwtSecret).to.not.be.undefined;
    expect(expiresIn).to.not.be.undefined;
    return "accessToken";
  })
});

After(() => {
  sandbox.resetHistory();
  this.companyId = undefined;
  this.email = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given(
  "companyId : {string}, email : {string} for send forgot password",
  async (companyId,email) => {
    this.companyId = companyId;
    this.email = email;
  }
);

When("try to get result for send forgot password", async () => {
  const sendForgotPasswordMailUseCase = makeSendForgotPasswordMailUseCase({
    userDb,
    companyDb,
    sendForgotPasswordMail,
    jwt,
    CustomError
  });
  try {
    this.result = await sendForgotPasswordMailUseCase({
        companyId : this.companyId,
        email : this.email,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then("it should return the result : {string} for send forgot password", async (result) => {
  this.result = JSON.stringify(this.result);
  result = JSON.parse(result);
  result = JSON.stringify(result);
  expect(this.error).to.be.undefined;
  expect(this.result).to.be.equal(result);
});

Then('it should return the error : {string} for send forgot password', async (error) => {
  expect(this.error).to.be.equal(error);
})

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
const makeGetCompanyListUseCase = require("./get-company-list-use-case");
const CustomError = require("../../utils/custom-error");

const companyDb = {
  getCompanyByCompanyId: () => {},
};
const userDb = {
  getCompanysIdByEmail: () => {},
};

let getCompanyByCompanyIdStub;
let getCompanysIdByEmailStub;

BeforeAll(() => {
  getCompanyByCompanyIdStub = sandbox.stub(companyDb, "getCompanyByCompanyId");
  getCompanysIdByEmailStub = sandbox.stub(userDb, "getCompanysIdByEmail");
});

Before(() => {
  getCompanysIdByEmailStub.callsFake((args) => {
    expect(args).to.have.own.property("email");
    if (args.email === "tcs@gmail.com") {
      return false;
    }
    return [{ companyId: 1 }];
  });

  getCompanyByCompanyIdStub.callsFake((args) => {
    expect(args).to.have.own.property("companyId");
    return { companyId: 1, companyName: "oyo", email: "oyo@gmail.com" };
  });
});

After(() => {
  sandbox.resetHistory();
  this.email = undefined;
  this.error = undefined;
  this.result = undefined;
});

AfterAll(() => sandbox.restore());

Given("email : {string} for get company list", async (email) => {
  this.email = email;
});

When("try to get result for get company list", async () => {
  const getCompanyListUseCase = makeGetCompanyListUseCase({
    userDb,
    companyDb,
    CustomError,
  });
  try {
    this.result = await getCompanyListUseCase({
      email: this.email,
    });
  } catch (err) {
    this.error = err.message;
  }
});

Then(
  "it should return the result : {string} for get company list",
  async (result) => {
    this.result = JSON.stringify(this.result);
    expect(this.error).to.be.undefined;
    expect(this.result).to.be.equal(result);
  }
);

Then(
  "it should return the error : {string} for get company list",
  async (error) => {
    expect(this.error).to.be.equal(error);
  }
);

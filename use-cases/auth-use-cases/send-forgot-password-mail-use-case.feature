Feature: Use Case To Send Forgot Password Mail

    Scenario Outline: It Should Successfully Send Forgot Password Mail
        Given companyId : '<companyId>', email : '<email>' for send forgot password
        When try to get result for send forgot password
        Then it should return the result : '<result>' for send forgot password

        Examples:
            | companyId | email         | result                        |
            | 1         | oyo@gmail.com | {"accessToken":"accessToken"} |

    Scenario Outline: It Should Throw Error For Change Password
        Given companyId : '<companyId>', email : '<email>' for send forgot password
        When try to get result for send forgot password
        Then it should return the error : '<error>' for send forgot password

        Examples:
            | companyId | email         | error                              |
            |           | oyo@gmail.com | "companyId" must be a number       |
            | 1         |               | "email" is not allowed to be empty |
            | 1         | oyo@          | "email" must be a valid email      |
            | 2         | oyo@gmail.com | company dont exists                |
            | 1         | abc@gmail.com | user dont exists                   |
Feature: Use Case To Login

    Scenario Outline: It Should Successfully Login
        Given companyId : '<companyId>', email : '<email>',password : '<password>' for login
        When try to get result for login
        Then it should return the result : '<result>' for login

        Examples:
            | companyId | email         | password | result                              |
            | 1         | oyo@gmail.com | 12345    | {"accessToken" : "encryptPassword"} |

    Scenario Outline: It Should Throw Error For Login
        Given companyId : '<companyId>', email : '<email>',password : '<password>' for login
        When try to get result for login
        Then it should return the error : '<error>' for login

        Examples:
            | companyId | email          | password | error                                 |
            |           | oyo@gmail.com  | 12345    | "companyId" must be a number          |
            | 1         |                | 12345    | "email" is not allowed to be empty    |
            | 1         | oyogmail.com   |          | "email" must be a valid email         |
            | 1         | oyo@gmail.com  |          | "password" is not allowed to be empty |
            | 2         | oyo@gmail.com  | 12345    | company dont exists                   |
            | 1         | abc@gmail.com  | 12345    | user dont exists                      |
            | 1         | abcd@gmail.com | 12345    | plz set password first than login     |
            | 1         | oyo@gmail.com  | 123456   | enter valid password                  |
Feature: Use Case To Register

    Scenario Outline: It Should Successfully Register
        Given companyName : '<companyName>', email : '<email>', userName : '<userName>',password : '<password>' for register
        When try to get result for register
        Then it should return the result : '<result>' for register

        Examples:
            | companyName | email         | userName   | password | result                     |
            | oyo         | oyo@gmail.com | riteshbhai | 12345    | {"userId":1,"companyId":1} |

    Scenario Outline: It Should Throw Error For Register
        Given companyName : '<companyName>', email : '<email>', userName : '<userName>',password : '<password>' for register
        When try to get result for register
        Then it should return the error : '<error>' for register

        Examples:
            | companyName | email         | userName   | password | error                                                |
            | oyo         |               | riteshbhai | 12345    | "email" is not allowed to be empty                   |
            | oyo         | oyogmail.com  | riteshbhai | 12345    | "email" must be a valid email                        |
            |             | oyo@gmail.com | riteshbhai | 12345    | "companyName" is not allowed to be empty             |
            | oyo         | oyo@gmail.com |            | 12345    | "userName" is not allowed to be empty                |
            | oyo         | oyo@gmail.com | riteshbhai |          | "password" is not allowed to be empty                |
            | oyo         | oyo@gmail.com | riteshbhai | 123      | "password" length must be at least 5 characters long |
            | oyo         | tcs@gmail.com | riteshbhai | 12345    | Company already exists                               |
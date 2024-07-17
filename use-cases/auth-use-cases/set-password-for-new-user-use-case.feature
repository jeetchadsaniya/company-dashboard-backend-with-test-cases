Feature: Use Case To Set Password For New User

    Scenario Outline: It Should Successfully Set Password For New User
        Given accessToken : '<accessToken>', password : '<password>' for send password for new user
        When try to get result for send password for new user
        Then it should return the result : '<result>' for send password for new user

        Examples:
            | accessToken | password | result                                                                        |
            | token       | 12345    | {"userId":1,"isPasswordSet":1,"status":"active","password":"encryptPassword"} |

    Scenario Outline: It Should Throw Error For Set Forgot Password New User
        Given accessToken : '<accessToken>', password : '<password>' for send password for new user
        When try to get result for send password for new user
        Then it should return the error : '<error>' for send password for new user

        Examples:
            | accessToken | password | error                                                |
            |             | 12345    | enter valid jwt token                                |
            | token       |          | "password" is not allowed to be empty                |
            | token       | 1234     | "password" length must be at least 5 characters long |
            | token2      | 12345    | user dont exists                                     |
            | token3      | 12345    | you already set password                             |

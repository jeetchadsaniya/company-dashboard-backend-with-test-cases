Feature: Use Case To Change Password

    Scenario Outline: It Should Successfully Change Password
        Given accessToken : '<accessToken>', newPassword : '<newPassword>' for change password
        When try to get result for change password
        Then it should return the result : '<result>' for change password

        Examples:
            | accessToken | newPassword | result                                                             |
            | token       | 12345       | {"userId" : 1,"isPasswordSet" : 1 ,"password" : "encryptPassword"} |

    Scenario Outline: It Should Throw Error For Change Password
        Given accessToken : '<accessToken>', newPassword : '<newPassword>' for change password
        When try to get result for change password
        Then it should return the error : '<error>' for change password

        Examples:
            | accessToken | newPassword | error                                                |
            | token       |             | "password" is not allowed to be empty                |
            | token       | 1234        | "password" length must be at least 5 characters long |
            | token2       | 12345        | user dont exists |
            | token3       | 12345        | you already set password |
            | token4       | 12345        | enter valid jwt token |
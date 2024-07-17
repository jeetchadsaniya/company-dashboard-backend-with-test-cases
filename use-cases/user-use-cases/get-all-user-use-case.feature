Feature: Use Case To Get All User

    Scenario Outline: It Should Successfully Get All User
        Given companyId : '<companyId>', queryStringObj : '<queryStringObj>' for get all user
        When try to get result for get all user
        Then it should return the result : '<result>' for get all user

        Examples:
            | companyId | queryStringObj | result         |
            | 1         | {"limit" : 5}  | [{"userId":1,"companyId":1}] |

Feature: Use Case To Delete User

    Scenario Outline: It Should Successfully Delete User
        Given userId : '<userId>', companyId : '<companyId>' for delete user
        When try to get result for delete user
        Then it should return the result : '<result>' for delete user

        Examples:
            | userId | companyId | result                                                                                                                                                                                     |
            | 4      | 1         | {"userId":4,"createdBy":1,"companyId":1} |

    Scenario Outline: It Should Throw Error For Delete User
        Given userId : '<userId>', companyId : '<companyId>' for delete user
        When try to get result for delete user
        Then it should return the error : '<error>' for delete user

        Examples:
            | userId | companyId | error                                                                                                                                                                                     |
            | 2      | 1         | user dont exists in your company |
            | 3      | 1         | dont allow to delete admin user |
